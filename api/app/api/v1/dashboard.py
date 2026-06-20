from fastapi import APIRouter,Depends
from sqlalchemy import func
from app.models.tasks import Tasks
from app.models.taskstatus import Taskstatus
# from app.models.task_type import TaskType
from app.database import SessionLocal
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

@router.get('/summary')
def summary():
    return {'total_tasks':0}

@router.get("/stats")
def get_stats(
    current_user=Depends(get_current_user)
):
    db = SessionLocal()

    try:

        # Base task query
        task_query = db.query(Tasks)

        # Normal user can see only own tasks
        if current_user.role.lower() != "admin":

            task_query = task_query.filter(
                Tasks.created_by ==
                current_user.id
            )
        
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

            **stats

        }

    finally:
        db.close()