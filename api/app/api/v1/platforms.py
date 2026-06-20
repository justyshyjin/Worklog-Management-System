from fastapi import APIRouter
from sqlalchemy import func
from app.models.platforms import Platforms
from app.database import SessionLocal


router = APIRouter()

@router.get("")
def get_platforms():
    db= SessionLocal()
    try:

        platforms = (
            db.query(Platforms)
            .all()
        )

        return [
            {
                "id": p.id,
                "platform_name": p.platform_name
            }
            for p in platforms
        ]

    finally:

        db.close()
