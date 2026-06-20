from pydantic import BaseModel


class TaskStatusCreate(BaseModel):

    status_name: str

    sequence_no: int

    description: str | None = None


class TaskStatusResponse(BaseModel):

    id: int

    status_name: str

    sequence_no: int

    description: str | None

    is_active: bool

    class Config:
        from_attributes = True