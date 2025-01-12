import "./App.css";
import TodoList from "./TodoList";
import React, {useState} from 'react';

function App() {
    const [tasks, setTasks] = useState([
        {   id: 1, name: "Zadanie 1", completed: false   },
        {   id: 2, name: "Zadanie 2", completed: false   },
        {   id: 3, name: "Zadanie 3", completed: false   }
    ]);

    function toggleTaskCompletion(id){
        const updatedTasks = tasks.map(task => 
            task.id === id ? {...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    }
    return (
        <div className="App">
            <header className="App-header">
                <TodoList tasks={tasks} toggleTaskCompletion={toggleTaskCompletion}/>
            </header>
        </div>
    );
}

export default App;
