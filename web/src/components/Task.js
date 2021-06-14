import axios from 'axios';
import { RefreshCw } from 'react-feather';
import React, { useState, useEffect } from 'react';

const Task = ({ id }) => {
  const [task, setTask] = useState({task_id: id, task_status: null, task_result: null})
  const [waiting, setWaiting] = useState(false);

  const refresh = async () => {
    setWaiting(true)
    const { data } = await axios.get("http://localhost:8000/tasks/" + id);
    setTask(data);
    setWaiting(false);
  }

  useEffect(() => {
    refresh();
  }, [])

  return (
    <tr>
      <td>
        <button className="btn btn-link p-0" onClick={() => { refresh(); }} disabled={waiting}>
          <RefreshCw className="feather" size={12} />
        </button>{' '}
        {id}
      </td>
      <td>{task.task_status}</td>
      <td>{task.task_result}</td>
    </tr>
  )
}

export default Task;