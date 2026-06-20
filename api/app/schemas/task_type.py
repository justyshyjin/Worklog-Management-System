from pydantic import BaseModel


class TaskTypeCreate(BaseModel):

    task_type_name: str

    description: str | None = None


class TaskTypeResponse(BaseModel):

    id: int

    task_type_name: str

    description: str | None

    is_active: bool

    class Config:
        from_attributes = True