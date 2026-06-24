from fastapi import APIRouter

from app.api.v1.auth import router as auth_routes
from app.api.v1.tasks import router as tasks_routes
from app.api.v1.projects import router as projects_routes
from app.api.v1.dashboard import router as dashboard_routes
from app.api.v1.platforms import router as platforms_routes
from app.api.v1.tasksource import router as tasksource_routes
from app.api.v1.tasktype import router as tasktype_routes
from app.api.v1.taskstatus import router as taskstatus_routes

api_router = APIRouter()

api_router.include_router(auth_routes, prefix="/auth", tags=["Authentication"])
api_router.include_router(tasks_routes, prefix="/tasks", tags=["Tasks"])
api_router.include_router(projects_routes, prefix="/projects", tags=["Projects"])
api_router.include_router(dashboard_routes, prefix="/dashboard", tags=["Dashboard"])
api_router.include_router(platforms_routes, prefix="/platforms", tags=["Platforms"])
api_router.include_router(tasksource_routes, prefix="/tasksource", tags=["Tasksource"])
api_router.include_router(tasktype_routes, prefix="/tasktype", tags=["Tasktype"])
api_router.include_router(taskstatus_routes, prefix="/taskstatus", tags=["Taskstatus"])