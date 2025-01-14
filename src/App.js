import "./App.css";
import TodoList from "./TodoList";
import React, {useState, useRef} from 'react';

function App() {
    const [tasks, setTasks] = useState([
        {   id: 3, name: "Clean the floor", completed: false   },
        {   id: 2, name: "Cook the meal", completed: false   },
        {   id: 1, name: "Do the laundry", completed: false   }
    ]);

    function toggleTaskCompletion(id){
        const updatedTasks = tasks.map(task => 
            task.id === id ? {...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    }
    const addTask = (taskName) =>
    {
        const newTask = { id: tasks.length + 1, name: taskName};
        setTasks([newTask, ...tasks]);
    }
    

    return (
        <div className="App">
            <header className="App-header">
                <TodoList tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} addTask={addTask}/>
            </header>
        </div>
    );
}

export default App;
