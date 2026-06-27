from fastapi import APIRouter,Depends
from sqlalchemy import func
from app.models.projects import Projects
from app.db.session import get_db
from sqlalchemy.orm import Session


router = APIRouter()


@router.get("")
def get_projects(db:Session = Depends(get_db),):
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