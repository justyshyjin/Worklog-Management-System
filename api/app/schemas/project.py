from pydantic import BaseModel


class ProjectCreate(BaseModel):

    project_name: str

    description: str | None = None

    platform_ids: list[int] = []


class ProjectUpdate(BaseModel):

    project_name: str | None = None

    description: str | None = None

    is_active: bool | None = None

    platform_ids: list[int] | None = None


class ProjectResponse(BaseModel):

    id: int

    project_name: str

    description: str | None

    is_active: bool

    class Config:
        from_attributes = True