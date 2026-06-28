from sqlalchemy import Column, Integer, ForeignKey, DateTime, Boolean, func
from sqlalchemy.orm import relationship

from app.db.base import Base


class ProjectPlatform(Base):
    __tablename__ = "project_platforms"

    id = Column(Integer, primary_key=True, index=True)

    project_id = Column(
        Integer,
        ForeignKey("projects.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    platform_id = Column(
        Integer,
        ForeignKey("platforms.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    is_default = Column(
        Boolean,
        default=False
    )

    created_at = Column(
        DateTime,
        server_default=func.now()
    )

    updated_at = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )

    # -----------------------
    # Relationships
    # -----------------------
    project = relationship("Projects", backref="project_platforms")
    platform = relationship("Platforms", backref="project_platforms")