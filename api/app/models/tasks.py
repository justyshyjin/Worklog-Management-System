from datetime import datetime

from sqlalchemy import (
    String,
    Text,
    Integer,
    DateTime,
    ForeignKey,
    Enum
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship
)

from app.db.base import Base
from app.db.mixins import TimestampMixin


class Tasks(Base, TimestampMixin):

    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)

    task_details: Mapped[str] = mapped_column(
        String(500),
        nullable=False
    )

    project_id: Mapped[int] = mapped_column(
        ForeignKey("projects.id")
    )

    task_source_id: Mapped[int] = mapped_column(
        ForeignKey("task_sources.id")
    )

    assigned_to: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )

    task_status_id: Mapped[int] = mapped_column(
        ForeignKey("task_status.id")
    )

    task_type_id: Mapped[int] = mapped_column(
        ForeignKey("task_types.id")
    )

    platform_id: Mapped[int] = mapped_column(
        ForeignKey("platforms.id")
    )

    jira_logged: Mapped[int] = mapped_column(
        default=0
    )

    created_date: Mapped[datetime] = mapped_column(
        DateTime
    )

    started_date: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=True
    )

    completed_date: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=True
    )

    total_minutes: Mapped[int] = mapped_column(
        Integer,
        default=0
    )

    work_description: Mapped[str] = mapped_column(
        Text,
        nullable=True
    )
    created_by: Mapped[int] = mapped_column(
        Integer,
        default=0
    )
    updated_by: Mapped[int] = mapped_column(
        Integer,
        default=0
    )
    remarks: Mapped[str] = mapped_column(
        Text,
        nullable=True
    )

    is_deleted: Mapped[bool] = mapped_column(
        default=False
    )
    
    history = relationship(
        "Taskhistory",
        back_populates="task",
        cascade="all, delete-orphan"
    )

    projects = relationship("Projects")
    tasksource = relationship("Tasksource")
    taskstatus = relationship("Taskstatus")
    tasktype = relationship("Tasktype")
    platform = relationship("Platforms")
    assignee = relationship("User")