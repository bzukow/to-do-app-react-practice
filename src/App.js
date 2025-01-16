import "./App.css";
import TodoList from "./TodoList";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
    const [tasks, setTasks] = useState("");
    useEffect(() => {
        fetch("http://localhost:3001/tasks")
            .then((response) => response.json())
            .then((data) => {
                const reversedTasks = [...data].reverse();
                setTasks(reversedTasks);
            })
            .catch((err) => console.error("Something got wrong 😅", err));
    }, []);

    function toggleTaskCompletion(id) {
        const taskToUpdate = tasks.find((task) => task.id === id);
        if (!taskToUpdate) {
            console.error("We couldn't find a task with ID:", id);
            return;
        }
        const updatedTask = {
            ...taskToUpdate,
            completed: !taskToUpdate.completed,
        };

        fetch(`http://localhost:3001/tasks/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: updatedTask.completed }), // Wysyłamy tylko zmieniony stan
        })
            .then((response) => {
                if (!response.ok)
                    throw new Error("It was impossible to update the task 😢");
                return response.json();
            })
            .then(() => {
                const updatedTasks = tasks.map((task) =>
                    task.id === id ? updatedTask : task
                );
                setTasks(updatedTasks);
            })
            .catch((err) => console.error("Update error: ", err));
    }

    const addTask = (taskName) => {
        const newTask = { id: uuidv4(), name: taskName, completed: false };
        
        fetch("http://localhost:3001/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        })
            .then((response) => response.json())
            .then((data) => setTasks((tasks) => [data, ...tasks]));
    };
    // ideally i would prefer to have a nice animation for both mobile and desktop when the task is being deleted but after trying a couple of posibilities it is not really working the way i wanted so i will just leave the animation part for a different practice project)
    function deleteTask(id) {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        fetch(`http://localhost:3001/tasks/${id}`, {
            method: "DELETE",
        })
    }
    return (
        <div className="App">
            <header className="App-header">
                <TodoList
                    tasks={tasks}
                    toggleTaskCompletion={toggleTaskCompletion}
                    addTask={addTask}
                    deleteTask={deleteTask}
                />
            </header>
        </div>
    );
}

export default App;
