import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaPencilAlt,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import {
  createTaskApi,
  deleteTaskByIdApi,
  fetchTaskApi,
  updateTaskByIdApi,
} from "./api";
import { notify } from "./Utils/utils";

export const TaskManager = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState(null);

  const handleTask = () => {
    if (updateTask && input) {
      // console.log("Update Api Call");
      const obj = {
        _id: updateTask._id,
        taskName: input,
        isDone: updateTask.isDone,
      };
      handleUpdateTask(obj);
    } else if (updateTask === null && input) {
      handleAddTask();
      // console.log("Add Task api call");
    }

    setInput("");
  };
  useEffect(() => {
    if (updateTask) {
      setInput(updateTask.taskName);
    }
  }, [updateTask]);
  const handleAddTask = async () => {
    const obj = {
      taskName: input,
      isDone: false,
    };
    try {
      const { message, success } = await createTaskApi(obj);
      if (success) {
        notify(message, "success");
      } else notify(message, "error");
      fetchAllTask();
    } catch (error) {
      notify("Failed To create task", "error");
    }
  };

  const fetchAllTask = async () => {
    try {
      const { data } = await fetchTaskApi();
      // console.log(data);
      setTasks(data);
      setCopyTasks(data);
    } catch (error) {
      notify("Failed To create task", "error");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const { success, message } = await deleteTaskByIdApi(id);
      if (success) {
        notify(message, "success");
      } else notify(message, "error");
      fetchAllTask();
    } catch (error) {
      notify("Failed To Delete task", "error");
    }
  };

  const handleCheckAndUncheck = async (task) => {
    const { _id, isDone, taskName } = task;
    const obj = {
      taskName,
      isDone: !isDone,
    };
    try {
      const { success, message } = await updateTaskByIdApi(_id, obj);
      if (success) {
        notify(message, "success");
      } else notify(message, "error");
      fetchAllTask();
    } catch (error) {
      notify("Failed To Delete task", "error");
    }
  };

  const handleUpdateTask = async (task) => {
    const { _id, isDone, taskName } = task;
    const obj = {
      taskName,
      isDone: isDone,
    };
    try {
      const { success, message } = await updateTaskByIdApi(_id, obj);
      if (success) {
        notify(message, "success");
      } else notify(message, "error");
      fetchAllTask();
    } catch (error) {
      notify("Failed To Delete task", "error");
    }
  };
  useEffect(() => {
    fetchAllTask();
  }, []);
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const oldTasks = [...copyTasks];
    const searchResults = oldTasks.filter((item) =>
      item.taskName.toLowerCase().includes(term)
    );
    setTasks(searchResults);
  };

  return (
    <div className="d-flex flex-column align-items-center w-50 m-auto mt-5">
      <h1 className="mb-4">Task Manager App</h1>
      {/* Input And Search Box */}
      <div className="d-flex justify-content-between align-items-center mb-4 w-100">
        <div className="input-group flex-grow-1 me-2">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className="form-control me-1"
            placeholder="Add a new Task..."
          />
          <button onClick={handleTask} className="btn btn-success  btn-sm me-2">
            <FaPlus className="m-2" />
          </button>
        </div>
        <div className="input-group flex-grow-1">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            onChange={handleSearch}
            className="form-control"
            type="text"
            placeholder="Search tasks"
          />
        </div>
      </div>
      {/* List of Items */}

      <div className="d-flex flex-column w-100">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center"
          >
            <span className={task.isDone ? "text-decoration-line-through" : ""}>
              {task.taskName}
            </span>
            <div>
              <button
                onClick={() => handleCheckAndUncheck(task)}
                type="button"
                className="btn btn-success btn-sm me-2"
              >
                <FaCheck />
              </button>
              <button
                onClick={() => setUpdateTask(task)}
                type="button"
                className="btn btn-primary btn-sm me-2"
              >
                <FaPencilAlt />
              </button>
              <button
                onClick={() => handleDeleteTask(task._id)}
                type="button"
                className="btn btn-danger btn-sm me-2"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};
