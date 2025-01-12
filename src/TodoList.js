import React from 'react';
import TodoItem from './TodoItem';

function TodoList({tasks, toggleTaskCompletion}){
    return (
        <div>
            <h2>
                Tasks to do &#10024;
            </h2>
            <ul>
                {tasks.map((task)=>(
                    <TodoItem key={task.id} task={task} toggleTaskCompletion={toggleTaskCompletion}/>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;