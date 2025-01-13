import React, {useState} from 'react';
import TodoItem from './TodoItem';

function TodoList({tasks, toggleTaskCompletion, addTask}){
    const [newTask, setNewTask] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if(newTask.trim()){
            addTask(newTask);
            setNewTask('');
        } else {
            alert("You can't add an empty task");
        }
    }
    return (
        <div>
            <h2>
                Tasks to do &#10024;
            </h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder='Add new task' />
            </form>
            <ul>
                {tasks.map((task)=>(
                    <TodoItem key={task.id} task={task} toggleTaskCompletion={toggleTaskCompletion}/>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;