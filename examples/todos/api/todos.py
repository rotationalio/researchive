import os
import psycopg2 as pg

from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from fastapi.responses import Response

db = pg.connect(os.environ["DATABASE_URL"])

app = FastAPI(
    title="TODOs",
    description="A simple REST API",
    version="1.0",
)

class Status(BaseModel):
    status:str
    timestamp:str
    version:str


class TODO(BaseModel):
    id: Optional[int]
    title:str
    description:str
    complete:bool = False


@app.get("/status", response_model=Status)
async def status():
    return Status(
        status = "ok",
        timestamp = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
        version = "1.0",
    )

@app.get("/todos", response_model=List[TODO])
async def todo_list():
    cur = db.cursor()
    cur.execute("SELECT * FROM todos")

    items = []
    for row in cur.fetchall():
        items.append(TODO(id=row[0], title=row[1], description=row[2], complete=row[3]))

    cur.close()
    return items

@app.post(
    "/todos",
    status_code=201,
    response_model=TODO,
    description="Create a single TODO item",
)
async def todo_create(todo: TODO):
    cur = db.cursor()
    cur.execute("INSERT INTO todos (title, description, complete) VALUES (%s,%s,%s) RETURNING id", (todo.title, todo.description, todo.complete))
    row = cur.fetchone()
    todo.id = row[0]
    db.commit()
    cur.close()
    return todo


@app.get("/todos/{todo_id}", response_model=TODO)
async def todo_detail(todo_id):
    cur = db.cursor()
    cur.execute("SELECT * FROM todos WHERE id=%s", (todo_id,))
    row = cur.fetchone()
    if row is None or len(row) == 0:
        raise HTTPException(404)
    todo = TODO(id=row[0], title=row[1], description=row[2], complete=row[3])
    cur.close()
    return todo

@app.put("/todos/{todo_id}")
async def todo_update(todo_id, todo:TODO):
    cur = db.cursor()
    cur.execute("SELECT title FROM todos WHERE id=%s", (todo_id,))
    row = cur.fetchone()
    if row is None or len(row) == 0:
        raise HTTPException(404)

    cur.execute("UPDATE todos SET title=%s, description=%s, complete=%s WHERE id=%s", (todo.title, todo.description, todo.complete, todo.id))
    db.commit()
    cur.close()
    return Response(status_code=204)

@app.delete("/todos/{todo_id}")
async def todo_delete(todo_id):
    cur = db.cursor()
    cur.execute("SELECT title FROM todos WHERE id=%s", (todo_id,))
    row = cur.fetchone()
    if row is None or len(row) == 0:
        raise HTTPException(404)

    cur.execute("DELETE FROM todos WHERE id=%s", (todo_id,))
    db.commit()
    cur.close()
    return Response(status_code=204)