from pydantic import BaseModel
from pydantic import EmailStr

from .common import TimestampSchema


class UserCreate(BaseModel):

    username: str

    password: str

    full_name: str

    email: EmailStr

    role: str = "DEVELOPER"


class UserUpdate(BaseModel):

    full_name: str | None = None

    email: EmailStr | None = None

    role: str | None = None

    is_active: bool | None = None


class UserResponse(
    TimestampSchema
):

    id: int

    username: str

    full_name: str

    email: str

    role: str

    is_active: bool

    class Config:
        from_attributes = True