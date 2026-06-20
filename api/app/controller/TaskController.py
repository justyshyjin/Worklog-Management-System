from sqlalchemy import func
from app.models.task import Task
from web.Learning.Worklog_management.api.app.models.taskstatus import TaskStatus
from app.database import SessionLocal
import re

def normalize(name: str) -> str:
    return re.sub(r"\s+", "_", name.strip().lower())

def get_tasks():
    db = SessionLocal()
    try:
        tasks = db.query(Task).all()
        return tasks
    finally:
        db.close()

def get_stats():
    db = SessionLocal()

    try:
        # 1. total tasks
        total = db.query(func.count(Task.id)).scalar() or 0

        # 2. fetch ALL statuses from DB
        status_rows = db.query(TaskStatus.id, TaskStatus.status_name).all()

        # id → normalized name map
        status_map = {
            status_id: normalize(name)
            for status_id, name in status_rows
        }

        # 3. IMPORTANT: pre-fill ALL with 0
        stats = {name: 0 for name in status_map.values()}

        # 4. get grouped counts
        rows = (
            db.query(Task.task_status_id, func.count(Task.id))
            .group_by(Task.task_status_id)
            .all()
        )

        # 5. fill actual values
        for status_id, count in rows:
            status_name = status_map.get(status_id)
            if status_name:
                stats[status_name] = count or 0

        # 6. response
        return {
            "total": total,
            **stats
        }

    finally:
        db.close()