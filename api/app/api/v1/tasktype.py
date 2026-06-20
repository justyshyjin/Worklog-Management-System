from fastapi import APIRouter
from sqlalchemy import func
# from app.models.task import Task
from app.models.tasktype import Tasktype
from app.database import SessionLocal

router = APIRouter()


@router.get("")
def get_tasktype():
    db= SessionLocal()
    try:
        tasktype = (
            db.query(Tasktype)
            .all()
        )

        return [
            {
                "id": tt.id,
                "tasktype_name": tt.task_type_name
            }
            for tt in tasktype
        ]

    finally:

        db.close()