from datetime import datetime
from pydantic import BaseModel
from fastapi import FastAPI

app = FastAPI(
    title="Heartbeat",
    description="A simple API service",
    version="1.0",
)

class Status(BaseModel):
    status:str
    timestamp:str
    version:str


@app.get("/status", response_model=Status)
async def status():
    return Status(
        status = "ok",
        timestamp = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
        version = "1.0",
    )

