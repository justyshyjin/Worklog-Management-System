from pydantic import BaseModel
from datetime import datetime


class ProjectPlatformOut(BaseModel):
    id: int
    project_id: int
    platform_id: int
    is_default: bool

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ProjectPlatformCreate(BaseModel):
    project_id: int
    platform_id: int
    is_default: bool = False

class ProjectPlatformUpdate(BaseModel):
    is_default: bool