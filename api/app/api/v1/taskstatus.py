from fastapi import APIRouter,Depends
from sqlalchemy import func
# from app.models.task import Task
from app.models.tasktype import Tasktype
from app.db.session import get_db
from sqlalchemy.orm import Session

router = APIRouter()


@router.get("")
def get_tasktype(
    db:Session=Depends(get_db)
):
    
    try:
        print("task Status")
    #     tasktype = (
    #         db.query(Tasktype)
    #         .all()
    #     )

    #     return [
    #         {
    #             "id": tt.id,
    #             "tasktype_name": tt.task_type_name
    #         }
    #         for tt in tasktype
    #     ]

    finally:

        db.close()