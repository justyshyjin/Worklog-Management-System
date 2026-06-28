from fastapi import APIRouter,Depends
from sqlalchemy import func
from app.models.platforms import Platforms
from app.db.session import get_db
from sqlalchemy.orm import Session


router = APIRouter()

@router.get("")
def get_platforms(
    db:Session=Depends(get_db)
):
    
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
