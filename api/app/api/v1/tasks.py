from fastapi import APIRouter,Depends
from sqlalchemy import func
from app.models.tasks import Tasks
from app.schemas.tasks import TaskCreate
from app.models.taskstatus import Taskstatus
from app.models.platforms import Platforms
from app.models.tasktype import Tasktype
from app.database import SessionLocal
from app.auth.dependencies import get_current_user
from datetime import datetime
from app.models.taskhistory import Taskhistory

import re

router = APIRouter()


def normalize(name: str) -> str:
    return re.sub(r"\s+", "_", name.strip().lower())

def format_minutes(minutes):
    if not minutes:
        return "0h 0m"

    hours = minutes // 60
    mins = minutes % 60
    return f"{hours}h {mins}m"

@router.get("")
def get_tasks(
    current_user=Depends(get_current_user)
):
    db = SessionLocal()
    
    try:
        query = db.query(Tasks)

        if current_user.role != "admin":

            query = query.filter(
                Tasks.created_by ==
                current_user.id
            )
            
        tasks = query.all()

        result = []

        for task in tasks:
            result.append({
                "id": task.id,

                "assigned_to":
                    task.assignee.username
                    if task.assignee else None,

                "project":
                    task.projects.project_name
                    if task.projects else None,

                "task_source":
                    task.tasksource.source_name
                    if task.tasksource else None,

                "task_status":
                    task.taskstatus.status_name
                    if task.taskstatus else None,

                "task_type":
                    task.tasktype.task_type_name
                    if task.tasktype else None,

                "platform":
                    task.platform.platform_name
                    if task.platform else None,

                "task_details": task.task_details,
                "work_description": task.work_description,
                "remarks": task.remarks,
                "jira_logged": task.jira_logged,
                "is_deleted": task.is_deleted,

                "total_minutes":
                    format_minutes(task.total_minutes),

                "created_date": task.created_date,
                "started_date": task.started_date,
                "completed_date": task.completed_date,
                "created_at": task.created_at,
                "updated_at": task.updated_at
            })

        return result

    finally:
        db.close()

@router.post("")
async def createtask( 
    tasks: TaskCreate,
    current_user = Depends(get_current_user)
):
    
    db = SessionLocal()

    try:

        # Get default NEW status
        status = (
            db.query(Taskstatus)
            .filter(
                Taskstatus.status_name == "NEW"
            )
            .first()
        )


        if not status:

            raise HTTPException(
                status_code=400,
                detail="Default NEW status not found"
            )


        # Create Task
        new_task = Tasks(

            task_details=
                tasks.task_details,

            work_description=
                tasks.work_description,

            project_id=
                tasks.project_id,

            task_source_id=
                tasks.task_source_id,

            task_type_id=
                tasks.task_type_id,


            # Default platform for now
            # will be changed after project-platform mapping
            platform_id=1,

            task_status_id=1,

            assigned_to=
                current_user.id,


            jira_logged=0,


            total_minutes=0,


            created_date=
                datetime.now(),


            created_by=
                current_user.id,


            updated_by=
                current_user.id
        )


        db.add(new_task)

        db.commit()

        db.refresh(new_task)



        # ---------------------------------------
        # Insert initial task history
        # ---------------------------------------

        task_history = Taskhistory(

            task_id=
                new_task.id,


            old_status_id=
                None,


            new_status_id=
                status.id,


            old_assigned_to=
                None,


            new_assigned_to=
                current_user.id,


            comments=
                "Task Created",


            changed_by=
                current_user.id,


            changed_at=
                datetime.now()
        )


        db.add(task_history)


        db.commit()



        return {

                "message":
                    "Task created successfully",


                "task_id":
                    new_task.id

            }


    except Exception as e:

        db.rollback()

        raise e


    finally:

        db.close()
