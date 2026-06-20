from pydantic import BaseModel


class ReportFilter(BaseModel):

    project_id: int | None = None

    task_status_id: int | None = None

    assigned_to: int | None = None

    date_from: str | None = None

    date_to: str | None = None

    selected_ids: list[int] = []