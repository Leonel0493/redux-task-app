import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTask } from "../features//tasks//tasksSlice";

function TaskList() {
  const tasks = useSelector((state) => state.tasks);
  const dispatcher = useDispatch();

  const handleDelete = (id) => {
    dispatcher(deleteTask(id));
  };

  return (
    <div className="w-4/6">
      <header className="flex justify-between items-center py-4">
        <h1>Tasks {tasks.length}</h1>
        <Link
          to="/add-task"
          className="bg-indigo-800 px-2 py-1 rounded-sm text-sm"
        >
          Create new task
        </Link>
      </header>

      <div className="grid grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-neutral-800 p-4 rounded-md">
            <header className="flex justify-between items-center">
              <h3>{task.title}</h3>
              <div className="flex justify-end">
                <Link
                  to={`/edit-task/${task.id}`}
                  className="bg-zinc-600 text-xs px-2 py-1 self-center rounded-md mr-2 hover:bg-zinc-500"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-xs px-2 py-1 self-center rounded-md hover:bg-red-400"
                >
                  delete
                </button>
              </div>
            </header>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
