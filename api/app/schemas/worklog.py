from pydantic import BaseModel
from datetime import date


class WorklogCreate(BaseModel):

    work_date: date

    minutes_spent: int

    description: str


class WorklogUpdate(BaseModel):

    work_date: date | None = None

    minutes_spent: int | None = None

    description: str | None = None


class WorklogResponse(BaseModel):

    id: int

    task_id: int

    work_date: date

    minutes_spent: int

    description: str

    class Config:
        from_attributes = True