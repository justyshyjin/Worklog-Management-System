from fastapi import APIRouter
from sqlalchemy import func
from app.models.tasksource import Tasksource
from app.database import SessionLocal

router = APIRouter()

@router.get("")
def get_tasksource():
    db= SessionLocal()
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