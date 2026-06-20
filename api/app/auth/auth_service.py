from sqlalchemy.orm import Session

from app.models.user import User

from app.auth.password_handler import (
    verify_password
)

from app.auth.jwt_handler import (
    create_access_token,
    create_refresh_token
)


def login_user(
    username: str,
    password: str,
    db: Session
):

    user = (
        db.query(User)
        .filter(User.username == username)
        .first()
    )

    if not user:
        return None

    if not verify_password(
        password,
        user.password_hash
    ):
        return None

    access_token = create_access_token(
        {
            "user_id": user.id,
            "username": user.username,
            "role": user.role
        }
    )

    refresh_token = create_refresh_token(
        {
            "user_id": user.id
        }
    )

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "user": user
    }