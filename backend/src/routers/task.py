from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from src.database import get_db

from src.models.task import Task

from src.schemas.task import TaskCreate

from src.security.authentication import get_current_user


router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


# CREATE TASK
@router.post("/create-task")
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    new_task = Task(
        title=task.title,
        description=task.description,
        user_id=current_user["user_id"]
    )

    db.add(new_task)

    db.commit()

    db.refresh(new_task)

    return {
        "message": "Task created successfully",
        "task": new_task
    }


# GET ALL TASKS
@router.get("/")
def get_tasks(
    completed: bool | None = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    query = db.query(Task).filter(
        Task.user_id == current_user["user_id"]
    )

    if completed is not None:

        query = query.filter(
            Task.completed == completed
        )

    tasks = query.all()

    return tasks

# GET SINGLE TASK
@router.get("/{task_id}")
def get_single_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == current_user["user_id"]
    ).first()

    if not task:

        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return task


# UPDATE TASK
@router.put("/update-task/{task_id}")
def update_task(
    task_id: int,
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    existing_task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == current_user["user_id"]
    ).first()

    if not existing_task:

        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    existing_task.title = task.title
    existing_task.description = task.description

    db.commit()

    db.refresh(existing_task)

    return {
        "message": "Task updated successfully",
        "task": existing_task
    }


# COMPLETE TASK
@router.put("/complete-task/{task_id}")
def complete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == current_user["user_id"]
    ).first()

    if not task:

        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    task.completed = True

    db.commit()

    db.refresh(task)

    return {
        "message": "Task completed successfully"
    }


# DELETE TASK
@router.delete("/delete-task/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):

    task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == current_user["user_id"]
    ).first()

    if not task:

        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    db.delete(task)

    db.commit()

    return {
        "message": "Task deleted successfully"
    }