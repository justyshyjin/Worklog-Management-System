from fastapi import APIRouter,Depends
from sqlalchemy import func,and_
from app.models.tasks import Tasks
from app.models.taskstatus import Taskstatus
# from app.models.task_type import TaskType
from app.db.session import get_db
from sqlalchemy.orm import Session
from app.core.permission import is_admin
from datetime import datetime, timedelta,date
from zoneinfo import ZoneInfo

from app.auth.dependencies import get_current_user

import re

router = APIRouter()

def normalize(name: str) -> str:
    return re.sub(r"\s+", "_", name.strip().lower())

def format_minutes(minutes):
    if not minutes:
        return "0h 0m"

    hours = minutes // 60
    mins = minutes % 60
    return f"{hours}h {mins}m"

def get_today_weekly_monthly_tasks(db: Session, current_user):

    task_query = db.query(Tasks)

    if not is_admin(current_user):
        task_query = task_query.filter(
            Tasks.created_by == current_user.id
        )

    #today task
    today = date.today()
    today_tasks = task_query.filter(
        Tasks.created_date >= datetime.combine(today, datetime.min.time()),
        Tasks.created_date < datetime.combine(today + timedelta(days=1), datetime.min.time())
    )   

    #Weekly task
    today_date = date.today()
    start_of_week = today_date - timedelta(days=today_date.weekday())
    end_of_week = start_of_week + timedelta(days=7)

    weekly_tasks = task_query.filter(
        Tasks.created_date >= datetime.combine(start_of_week, datetime.min.time()),
        Tasks.created_date < datetime.combine(end_of_week, datetime.min.time())
    )

    #Monthly task
    first_day_of_month = date.today().replace(day=1)
    if date.today().month == 12:
        first_day_of_next_month = date(date.today().year + 1, 1, 1)
    else:
        first_day_of_next_month = date(date.today().year, date.today().month + 1, 1)

        monthly_tasks = task_query.filter(
        Tasks.created_date >= datetime.combine(first_day_of_month, datetime.min.time()),
        Tasks.created_date < datetime.combine(first_day_of_next_month, datetime.min.time())
    )

    return today_tasks, weekly_tasks, monthly_tasks


def apply_quick_filter(query, range):

    range_filter = range

    now = date.today()

    if range_filter == "today":

        start = datetime.combine(now, datetime.min.time()),
        end = datetime.combine(now + timedelta(days=1), datetime.min.time())

        return query.filter(
            Tasks.created_date >= start,
            Tasks.created_date < end
        )

    elif range_filter == "week":
        today_date = date.today()
        start_of_week = today_date - timedelta(days=today_date.weekday())
        end_of_week = start_of_week + timedelta(days=7)

        return query.filter(
            Tasks.created_date >= datetime.combine(start_of_week, datetime.min.time()),
            Tasks.created_date < datetime.combine(end_of_week, datetime.min.time())
        )

    elif range_filter == "month":

        today_date = date.today()

        start_of_month = today_date.replace(day=1)

        if today_date.month == 12:
            next_month = today_date.replace(year=today_date.year + 1, month=1, day=1)
        else:
            next_month = today_date.replace(month=today_date.month + 1, day=1)

        return query.filter(
            Tasks.created_date >= datetime.combine(start_of_month, datetime.min.time()),
            Tasks.created_date < datetime.combine(next_month, datetime.min.time())
        )

    return query

# @router.get('/summary')
# def summary():
#     return {'total_tasks':0}

@router.get("/stats")
def get_stats(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
    # filters: dict = {},   # ✅ ADDED FILTER INPUT
    range: str = None
):
    print(range)
    try:

        # Base task query
        task_query = db.query(Tasks)

        # Normal user can see only own tasks
        if not is_admin(current_user):

            task_query = task_query.filter(
                Tasks.created_by ==
                current_user.id
            )
        today_tasks, weekly_tasks, monthly_tasks = get_today_weekly_monthly_tasks(db, current_user)

        # ✅ APPLY QUICK FILTER HERE
        task_query = apply_quick_filter(task_query, range)

        # 1. Total tasks
        total = (
            task_query
            .with_entities(
                func.count(Tasks.id)
            )
            .scalar()
            or 0
        )
        
        
        # 2. Fetch ALL statuses
        status_rows = (
            db.query(
                Taskstatus.id,
                Taskstatus.status_name
            )
            .all()
        )


        status_map = {

            status_id:
                normalize(name)

            for status_id, name in status_rows

        }


        # 3. Pre-fill all statuses
        stats = {

            name: 0

            for name in status_map.values()

        }


        # 4. Group only allowed tasks
        rows = (
            task_query
            .with_entities(
                Tasks.task_status_id,
                func.count(Tasks.id)
            )
            .group_by(
                Tasks.task_status_id
            )
            .all()
        )

        # 5. Fill counts
        for status_id, count in rows:

            status_name = (
                status_map.get(status_id)
            )

            if status_name:

                stats[status_name] = (
                    count or 0
                )


        return {

            "total": total,
            "today": today_tasks.count(),
            "weekly": weekly_tasks.count(),
            "monthly": monthly_tasks.count(),
            **stats

        }

    finally:
        db.close()

