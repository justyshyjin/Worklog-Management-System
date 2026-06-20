from fastapi import APIRouter
from sqlalchemy import func
from app.models.projects import Projects
from app.database import SessionLocal

router = APIRouter()


@router.get("")
def get_projects():
    db= SessionLocal()
    try:

        projects = (
            db.query(Projects)
            .all()
        )

        return [
            {
                "id": p.id,
                "project_name": p.project_name
            }
            for p in projects
        ]

    finally:

        db.close()