from datetime import datetime

from sqlalchemy import (
    BigInteger,
    Integer,
    Text,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship
)

from app.db.base import Base


class Taskhistory(Base):

    __tablename__ = "task_history"


    id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True
    )


    task_id: Mapped[int] = mapped_column(
        BigInteger,
        ForeignKey(
            "tasks.id"
        ),
        nullable=False
    )


    old_status_id: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey(
            "task_status.id"
        ),
        nullable=True
    )


    new_status_id: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey(
            "task_status.id"
        ),
        nullable=True
    )


    old_assigned_to: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey(
            "users.id"
        ),
        nullable=True
    )


    new_assigned_to: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey(
            "users.id"
        ),
        nullable=True
    )


    comments: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )


    changed_by: Mapped[int] = mapped_column(
        Integer,
        ForeignKey(
            "users.id"
        ),
        nullable=False
    )


    changed_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.now
    )


    # -------------------------
    # Relationships
    # -------------------------


    task = relationship(
        "Tasks",
        back_populates="history"
    )


    old_status = relationship(
        "Taskstatus",
        foreign_keys=[old_status_id]
    )


    new_status = relationship(
        "Taskstatus",
        foreign_keys=[new_status_id]
    )


    old_assigned_user = relationship(
        "User",
        foreign_keys=[old_assigned_to]
    )


    new_assigned_user = relationship(
        "User",
        foreign_keys=[new_assigned_to]
    )


    changed_user = relationship(
        "User",
        foreign_keys=[changed_by]
    )