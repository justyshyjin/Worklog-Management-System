from jose import jwt

from fastapi import Depends
from fastapi import HTTPException
from fastapi.security import HTTPBearer

from sqlalchemy.orm import Session

from app.db.session import SessionLocal

from app.models.user import User

from app.core.config import settings


security = HTTPBearer()


def get_db():

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def get_current_user(
    token=Depends(security),
    db: Session = Depends(get_db)
):

    try:

        payload = jwt.decode(
            token.credentials,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )

        user_id = payload.get("user_id")

        user = (
            db.query(User)
            .filter(User.id == user_id)
            .first()
        )

        if not user:
            raise Exception()

        return user

    except Exception:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )