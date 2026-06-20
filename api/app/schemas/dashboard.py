from pydantic import BaseModel


class DashboardSummary(BaseModel):

    total_tasks: int

    weekly_tasks: int

    monthly_tasks: int

    yearly_tasks: int

    weekly_hours: float

    monthly_hours: float

    jira_logged: int

    jira_not_logged: int