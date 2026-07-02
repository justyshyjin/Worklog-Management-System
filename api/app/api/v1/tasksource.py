from fastapi import APIRouter,Depends
from sqlalchemy import func
from app.models.tasksource import Tasksource
from app.db.session import get_db
from sqlalchemy.orm import Session

router = APIRouter()

@router.get("")
def get_tasksource(
    db:Session=Depends(get_db)
):
    
    try:

        tasksource = (
            db.query(Tasksource)
            .all()
        )

        return [
            {
                "id": ts.id,
                "source_name": ts.source_name
            }
            for ts in tasksource
        ]

    finally:

        db.close()