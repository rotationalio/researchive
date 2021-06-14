from datetime import datetime
from version import get_version
from celery.result import AsyncResult
from fastapi.responses import JSONResponse
from fastapi import Body, FastAPI, Form, Request
from fastapi.middleware.cors import CORSMiddleware

from worker import create_task

app = FastAPI(
    title="Researchive API",
    description="A simple research archive app to demonstrate Docker",
    version=get_version(),
)

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/status")
async def status():
    return JSONResponse({
        "status": "ok",
        "timestamp": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
        "version": get_version(),
    })

@app.post("/tasks", status_code=201)
async def run_task(payload = Body(...)):
    task_type = payload["type"]
    task = create_task.delay(int(task_type))
    return JSONResponse({"task_id": task.id})


@app.get("/tasks/{task_id}")
async def get_status(task_id):
    task_result = AsyncResult(task_id)
    result = {
        "task_id": task_id,
        "task_status": task_result.status,
        "task_result": task_result.result
    }
    return JSONResponse(result)