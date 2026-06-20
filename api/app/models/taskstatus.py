from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import Boolean

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.db.base import Base


class Taskstatus(Base):

    __tablename__ = "task_status"

    id: Mapped[int] = mapped_column(primary_key=True)

    status_name: Mapped[str] = mapped_column(
        String(100),
        unique=True
    )

    sequence_no: Mapped[int] = mapped_column(
        Integer
    )

    description: Mapped[str] = mapped_column(
        String(500),
        nullable=True
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True
    )