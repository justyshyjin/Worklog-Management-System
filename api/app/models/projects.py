from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import Boolean
from sqlalchemy import ForeignKey

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.db.base import Base
from app.db.mixins import TimestampMixin


class Projects(Base, TimestampMixin):

    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(primary_key=True)

    project_name: Mapped[str] = mapped_column(
        String(255),
        unique=True
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=True
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True
    )

    created_by: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )

    creator = relationship("User")