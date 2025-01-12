import React from 'react';

function TodoItem({task, toggleTaskCompletion}){
    return (
        <li>
            <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(task.id)}/>
            <span>  {task.name}</span>
        </li>
    );
};

export default TodoItem;