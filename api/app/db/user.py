from sqlalchemy import String
from sqlalchemy import Boolean
from sqlalchemy import Enum

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.db.base import Base
from app.db.mixins import TimestampMixin


class User(Base, TimestampMixin):

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)

    username: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    full_name: Mapped[str] = mapped_column(
        String(255)
    )

    email: Mapped[str] = mapped_column(
        String(255)
    )

    role: Mapped[str] = mapped_column(
        Enum(
            "ADMIN",
            "MANAGER",
            "DEVELOPER",
            "TESTER",
            name="user_roles"
        ),
        default="DEVELOPER"
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True
    )