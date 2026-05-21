from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from src.database import engine, Base
from src.routers.task import router as task_router
from src.routers.auth import router as auth_router

app = FastAPI(
    title="Task Manager API"
)

# CORS SETTINGS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://task-manager-ecru-iota.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# CREATE DATABASE TABLES
Base.metadata.create_all(bind=engine)

# ROUTERS
app.include_router(auth_router)
app.include_router(task_router)

# HOME ROUTE
@app.get("/")
def home():
    return {
        "message": "Task Manager API Running Successfully"
    }