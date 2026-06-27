from datetime import datetime, timedelta, timezone

from jose import jwt, JWTError

from app.core.config import settings

def create_access_token(
    data: dict,
    expires_delta: timedelta | None = None
):

    payload = data.copy()


    if expires_delta:

        expire = datetime.now(timezone.utc) + expires_delta

    else:

        expire = (
            datetime.now(timezone.utc)
            +
            timedelta(
                minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
            )
        )

    payload["exp"] = expire

    payload["type"] = "access"


    return jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )



def create_refresh_token(
    data: dict
):

    payload = data.copy()

    expire = (
        datetime.now(timezone.utc)
        +
        timedelta(
            days=settings.REFRESH_TOKEN_EXPIRE_DAYS
        )
    )

    payload["exp"] = expire

    payload["type"] = "refresh"


    return jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )



def decode_token(token):

    try:

        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[
                settings.ALGORITHM
            ]
        )

        return payload


    except JWTError as e:

        print("JWT ERROR:", e)

        return None