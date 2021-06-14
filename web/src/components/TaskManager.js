import axios from 'axios';
import Task from './Task';
import React, { useState } from 'react';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = async (length) => {
    const { data } = await axios.post("http://localhost:8000/tasks", {type: length});
    setTasks([...tasks, data]);
  }

  const taskList = tasks.map((obj) => {
    return <Task id={obj.task_id} key={obj.task_id} />
  })

  return (
    <>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 className="h2">Tasks</h1>
      <div className="btn-toolbar mb-2 mb-md-0">
        <div className="btn-group me-2">
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => addTask(1)}>Short</button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => addTask(2)}>Medium</button>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => addTask(3)}>Long</button>
        </div>
      </div>
    </div>
    <table className="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        {taskList}
      </tbody>
    </table>
    </>
  );
}

export default TaskManager;