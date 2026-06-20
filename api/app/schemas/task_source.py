from pydantic import BaseModel


class TaskSourceCreate(BaseModel):

    source_name: str

    description: str | None = None


class TaskSourceResponse(BaseModel):

    id: int

    source_name: str

    description: str | None

    is_active: bool

    class Config:
        from_attributes = True