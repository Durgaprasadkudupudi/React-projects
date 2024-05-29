import React, { useState, useEffect } from "react";

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
        document.head.appendChild(link);
    }, []);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, { text: newTask, completed: false }]);
            setNewTask("");
            showMessageWithTimeout("Task added successfully!");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        showMessageWithTimeout("Task deleted successfully!");
    }

    function moveTaskUp(index) {
        if (index === 0) return;
        const newTasks = [...tasks];
        [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
        setTasks(newTasks);
    }

    function moveTaskDown(index) {
        if (index === tasks.length - 1) return;
        const newTasks = [...tasks];
        [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]];
        setTasks(newTasks);
    }

    function toggleTaskCompletion(index) {
        const updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function showMessageWithTimeout(msg) {
        setMessage(msg);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
    }

    return (
        <div className="todolist">
            <h1>To-Do List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="add-button" onClick={addTask}>
                    Add
                </button>
            </div>
            <ol>
                {tasks.map((task, index) => (
                    <li key={index} className={task.completed ? "completed" : ""}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(index)}
                        />
                        <span className="text">{task.text}</span>
                        <button className="delete-button" onClick={() => deleteTask(index)}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                        <button className="up-button" onClick={() => moveTaskUp(index)}>
                            <i className="fas fa-arrow-up"></i>
                        </button>
                        <button className="down-button" onClick={() => moveTaskDown(index)}>
                            <i className="fas fa-arrow-down"></i>
                        </button>
                    </li>
                ))}
            </ol>
            {showMessage && <div className="popup-message">{message}</div>}
        </div>
    );
}

export default TodoList;
