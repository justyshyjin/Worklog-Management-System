from sqlalchemy import Column, Integer, String, JSON

from app.db.base import Base

class SavedFilters(Base):

    __tablename__ = "saved_filters"


    id = Column(
        Integer,
        primary_key=True
    )


    user_id = Column(
        Integer,
        nullable=False
    )


    module = Column(
        String(50),
        nullable=False
    )


    name = Column(
        String(100),
        nullable=False
    )


    filter_json = Column(
        JSON,
        nullable=False
    )