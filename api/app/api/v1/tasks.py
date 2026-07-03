from fastapi import APIRouter,Depends,HTTPException,Query,Request
from sqlalchemy import func,case,or_
from app.models import Tasks,Projects,Platforms,Taskstatus
from app.schemas.tasks import TaskCreate
from app.core.permission import is_admin
from app.db.session import get_db
from sqlalchemy.orm import Session
from app.auth.dependencies import get_current_user
from datetime import date,datetime,timedelta
from app.models.taskhistory import Taskhistory
from app.util.formatters import calculate_working_minutes
from typing import List
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
def get_tasks(request: Request,

    search: str | None = None,
    status: List[int] | None =  Query(None),
    project: List[int] | None =  Query(None),
    platform: List[int] | None =  Query(None),
    created_from: date | None = None,
    created_to: date | None = None,
    hours: List[float] | None = Query(None),
    db:Session = Depends(get_db),
    range: str | None = None,
    current_user=Depends(get_current_user)

):

    try:

        query = db.query(Tasks)

        # ----------------------------------
        # Existing user based filtering
        # ----------------------------------

        if not is_admin(current_user):

            query = query.filter(
                Tasks.created_by ==
                current_user.id
            )

        # ----------------------------------
        # Search filter
        # ----------------------------------

        if search:
            search_pattern = f"%{search}%"
            query = query.filter(
                or_(
                Tasks.task_details.ilike(search_pattern),
                Tasks.work_description.ilike(search_pattern),
                Tasks.remarks.ilike(search_pattern)
            )
            )

        # ----------------------------------
        # Status filter
        # ----------------------------------

        if status:

            query = query.filter(
                Tasks.task_status_id.in_(status)
            )

        # ----------------------------------
        # Project filter
        # ----------------------------------

        if project:

            query = query.filter(
                Tasks.project_id.in_(project)
            )
            

        # ----------------------------------
        # Platform filter
        # ----------------------------------

        if platform:

            query = query.filter(
                Tasks.platform_id.in_(platform)
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

        #Hours using range filter
        if hours:
            min_hours, max_hours = hours

            # Only finished tasks should be considered for hour filtering
            query = query.filter(
                Tasks.task_status_id == 3   # 3 is the id of the finished status
            )

            if min_hours is not None:
                query = query.filter(
                    Tasks.total_minutes >= (min_hours * 60)
                )

            if max_hours is not None:
                query = query.filter(
                    Tasks.total_minutes <= (max_hours * 60)
                )

        # ----------------------------------
        # Hours filter
        # ----------------------------------

        # if min_hours is not None:

        #     query = query.filter(
        #         Tasks.total_minutes >=
        #         (min_hours * 60)
        #     )

        # if max_hours is not None:

        #     query = query.filter(
        #         Tasks.total_minutes <=
        #         (max_hours * 60)
        #     )
        # ----------------------------------
        # Quick Report
        # ----------------------------------
        
        if range == "today":
            now = date.today()

            query = query.filter(
                Tasks.created_date >= datetime.combine(now, datetime.min.time()),
                Tasks.created_date < datetime.combine(now + timedelta(days=1), datetime.min.time())
            )

        elif range == "week":
            today_date = date.today()
            start_of_week = today_date - timedelta(days=today_date.weekday())
            end_of_week = start_of_week + timedelta(days=7)

            query = query.filter(
                Tasks.created_date >= datetime.combine(start_of_week, datetime.min.time()),
                Tasks.created_date < datetime.combine(end_of_week, datetime.min.time())
            )

        elif range == "month":
            today_date = date.today()

            start_of_month = today_date.replace(day=1)

            if today_date.month == 12:
                next_month = today_date.replace(year=today_date.year + 1, month=1, day=1)
            else:
                next_month = today_date.replace(month=today_date.month + 1, day=1)

            query = query.filter(
                Tasks.created_date >= datetime.combine(start_of_month, datetime.min.time()),
                Tasks.created_date < datetime.combine(next_month, datetime.min.time())
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
                (
                    Tasks.task_status_id == 1,
                    1
                ),
                else_=2
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


            from_status_id=
                1,


            to_status_id=
                1,

            old_assigned_to=
                current_user.id,


            new_assigned_to=
                current_user.id,


            action=
                "Task Created",


            changed_by=
                current_user.id,


            created_at=
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
        
        from_status = task.task_status_id
            
        if not from_status:

            raise HTTPException(
                status_code=400,
                detail=f"Current status not found"
            )
        
        if from_status==3:
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

        
        to_status = status_flow.get(
            task.task_status_id
        )
        
        if not to_status:

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
            to_status
        )
        
        if to_status==STATUS_IN_PROGRESS:
            task.started_date = (
               now
            )
        
        if to_status==STATUS_FINISHED:
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

            from_status_id =
                from_status,

            to_status_id =
                to_status,

            old_assigned_to =
                task.assigned_to,

            new_assigned_to =
                task.assigned_to,
            
            action="Status Changed",

            changed_by =
                current_user.id                                                                                                                                                                                                           

        )


        db.add(history)

        try:
            db.commit()
            db.refresh(task)
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=500,
                detail=str(e)
            )   

        return {
            "success":True,

            "message":
                "Task status updated successfully",

            "task_id":
                task.id,

            "from_status":
                from_status,

            "to_status":
                to_status

        }



    finally:

        db.close()
        

    
