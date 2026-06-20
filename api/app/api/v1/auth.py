from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.schemas.auth import LoginRequest

from app.auth.auth_service import (
    login_user
)

from app.auth.dependencies import (
    get_db,
    get_current_user
)

router = APIRouter()


@router.post("/login")
def login(
    payload: LoginRequest,
    db: Session = Depends(get_db)
):

    result = login_user(
        payload.username,
        payload.password,
        db
    )

    if not result:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    return result


@router.get("/me")
def me(
    user=Depends(get_current_user)
):

    return {
        "id": user.id,
        "username": user.username,
        "full_name": user.full_name,
        "role": user.role
    }


@router.post("/logout")
def logout():

    return {
        "success": True
    }