import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Label from "../atoms/Label";
import { addTask, editTask } from "../features/tasks/tasksSlice";

function TaskForm() {
  const dispatcher = useDispatch();
  const taskSelector = useSelector((state) => state.tasks);
  const navigation = useNavigate();
  const params = useParams();

  const [formTask, setFormTask] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormTask({
      ...formTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (params.id) {
      dispatcher(editTask({ ...formTask, id: params.id }));
    } else {
      dispatcher(
        addTask({
          ...formTask,
          id: uuid(),
          completed: false,
        })
      );
    }

    navigation("/");
  };

  useEffect(() => {
    if (params.id) {
      const foundTask = taskSelector.find((task) => task.id === params.id);

      if (foundTask) {
        setFormTask(foundTask);
      }
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
      <Label labelFor="title" labelText="Title:" />
      <input
        type="text"
        name="title"
        placeholder="title"
        onChange={handleChange}
        value={formTask.title}
        className="w-full p-2 my-2 bg-zinc-600 rounded-md"
      />

      <Label labelFor="description" labelText="Description:" />
      <textarea
        name="description"
        placeholder="description"
        onChange={handleChange}
        value={formTask.description}
        className="w-full p-2 my-2 bg-zinc-600 rounded-md"
      ></textarea>

      <button className="bg-indigo-600 px-2 py-1 rounded-md">Save</button>
    </form>
  );
}

export default TaskForm;
