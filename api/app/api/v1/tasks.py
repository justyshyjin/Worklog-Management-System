from fastapi import APIRouter,Depends,HTTPException,Query
from datetime import date

from sqlalchemy import func,case

from app.models import Tasks,Projects,Platforms,Taskstatus

from app.schemas.tasks import TaskCreate

from app.db.session import get_db
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from datetime import datetime
from app.models.taskhistory import Taskhistory
from app.util.formatters import calculate_working_minutes

from typing import Optional
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

    search: str | None = None,
    status: str | None = None,
    project: int | None = None,
    platform: int | None = None,
    created_from: date | None = None,
    created_to: date | None = None,
    min_hours: int | None = None,
    max_hours: int | None = None,

    db:Session = Depends(get_db),

    current_user=Depends(get_current_user)

):

    try:

        query = db.query(Tasks)

        # ----------------------------------
        # Existing user based filtering
        # ----------------------------------

        if current_user.role != "admin":

            query = query.filter(
                Tasks.created_by ==
                current_user.id
            )

        # ----------------------------------
        # Search filter
        # ----------------------------------

        if search:

            query = query.filter(
                Tasks.task_details.ilike(
                    f"%{search}%"
                )
            )

        # ----------------------------------
        # Status filter
        # ----------------------------------

        if status:

            query = query.join(
                Tasks.task_status_id
            ).filter(
                Tasks.task_status_id.has(
                    status_name=status
                )
            )

        # ----------------------------------
        # Project filter
        # ----------------------------------

        if project:

            query = query.filter(
                Tasks.project_id == project
            )
            

        # ----------------------------------
        # Platform filter
        # ----------------------------------

        if platform:

            query = query.filter(
                Tasks.platform_id == platform
            )

        # ----------------------------------
        # Created date range
        # ----------------------------------

        if created_from:

            query = query.filter(
                Tasks.created_date >= created_from
            )


        if created_to:

            query = query.filter(
                Tasks.created_date <= created_to
            )

        # ----------------------------------
        # Hours filter
        # ----------------------------------

        if min_hours is not None:

            query = query.filter(
                Tasks.total_minutes >=
                (min_hours * 60)
            )

        if max_hours is not None:

            query = query.filter(
                Tasks.total_minutes <=
                (max_hours * 60)
            )

        # ----------------------------------
        # IN_PROGRESS first
        # then ID order
        # ----------------------------------

        query = query.order_by(

            case(
                (
                    Tasks.task_status_id == 2,
                    0
                ),
                else_=1
            ),

            Tasks.id.asc()

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


                "task_details":
                    task.task_details,


                "work_description":
                    task.work_description,


                "remarks":
                    task.remarks,


                "jira_logged":
                    task.jira_logged,


                "is_deleted":
                    task.is_deleted,


                "total_minutes":
                    format_minutes(
                        task.total_minutes
                    ),


                "created_date":
                    task.created_date,


                "started_date":
                    task.started_date,


                "completed_date":
                    task.completed_date,


                "created_at":
                    task.created_at,


                "updated_at":
                    task.updated_at

            })


        return result


    finally:

        db.close()

@router.post("")
async def createtask( 
    tasks: TaskCreate,
    db:Session=Depends(get_db),
    current_user = Depends(get_current_user)
):

    try:

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
        
@router.patch("/{task_id}/status")
def change_task_status(
    task_id: int,
    db:Session=Depends(get_db),
    current_user = Depends(get_current_user)
):
    
    
    try:
        # ---------------------------------
        # Get Task
        # ---------------------------------
        task = (
            db.query(Tasks).filter(
                Tasks.id==task_id
            ).first()
            )
        if not task:

            raise HTTPException(
                status_code=404,
                detail=f"Task not found"
            )
        
        # ---------------------------------
        # Current Status
        # ---------------------------------
        
        old_status = task.task_status_id
            
        if not old_status:

            raise HTTPException(
                status_code=400,
                detail=f"Current status not found"
            )
        
        if old_status==3:
            raise HTTPException(
                status_code=301,
                detail=f"This task is already finished. Please edit the task to change the status in need."
            )
        # ---------------------------------
        # Determine Next Status
        # ---------------------------------
        
        status_flow = {

            1: 2,   # NEW -> IN_PROGRESS

            2: 3    # IN_PROGRESS -> FINISHED

        }

        
        new_status = status_flow.get(
            task.task_status_id
        )
        
        if not new_status:

            raise HTTPException(

                status_code=400,

                detail=
                f"Status change not allowed"

            )




        # ---------------------------------
        # Update Task
        # ---------------------------------
        STATUS_IN_PROGRESS = 2
        STATUS_FINISHED = 3

        now = datetime.now()
        
        task.task_status_id = (
            new_status
        )
        
        if new_status==STATUS_IN_PROGRESS:
            task.started_date = (
               now
            )
        
        if new_status==STATUS_FINISHED:
            task.completed_date = (
                now
            )
            task.total_minutes = calculate_working_minutes(
                task.started_date,
                now
            )
            
        task.updated_by = (
            current_user.id
        )

        task.updated_date = (
            datetime.now()
        )

        # ---------------------------------
        # Task History Entry
        # ---------------------------------

        history = Taskhistory(

            task_id =
                task.id,

            old_status_id =
                old_status,

            new_status_id =
                new_status,

            old_assigned_to =
                task.assigned_to,

            new_assigned_to =
                task.assigned_to,
            
            comments="Status Changed",

            changed_by =
                current_user.id,

            changed_at =
                datetime.now()

        )


        db.add(history)



        db.commit()


        db.refresh(task)



        return {
            "success":True,

            "message":
                "Task status updated successfully",

            "task_id":
                task.id,

            "old_status":
                old_status,

            "new_status":
                new_status

        }



    finally:

        db.close()
        
@router.get("/filters/options")
def filter_options():
    print("test")
    
