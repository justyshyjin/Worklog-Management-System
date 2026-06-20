from pydantic import BaseModel
from datetime import datetime


from pydantic import BaseModel


class TaskCreate(BaseModel):

    task_details: str

    project_id: int

    task_source_id: int

    task_type_id: int

    work_description: str | None = None

    remarks: str | None = None

class TaskUpdate(BaseModel):

    task_details: str | None = None

    project_id: int | None = None

    task_source_id: int | None = None

    assigned_to: int | None = None

    task_status_id: int | None = None

    task_type_id: int | None = None

    platform_id: int | None = None

    jira_logged: str | None = None

    work_description: str | None = None

    remarks: str | None = None


class TaskFilter(BaseModel):

    project_id: int | None = None

    task_status_id: int | None = None

    task_type_id: int | None = None

    task_source_id: int | None = None

    platform_id: int | None = None

    assigned_to: int | None = None

    jira_logged: str | None = None

    date_from: datetime | None = None

    date_to: datetime | None = None

    search: str | None = None


class TaskResponse(BaseModel):

    id: int

    task_details: str

    project_id: int

    task_source_id: int

    assigned_to: int

    task_status_id: int

    task_type_id: int

    platform_id: int

    jira_logged: str

    total_minutes: int

    work_description: str | None

    remarks: str | None

    created_date: datetime

    started_date: datetime | None

    completed_date: datetime | None

    class Config:
        from_attributes = True