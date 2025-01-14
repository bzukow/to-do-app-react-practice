import React from 'react';
import styles from './TodoItem.module.css';

function TodoItem({task, toggleTaskCompletion}){
    return (
        <li className={`${styles['todo-item']} ${task.completed ? styles.completed : ""}`}>
            <input type="checkbox" checked={task.completed} id={task.id} onChange={() => toggleTaskCompletion(task.id)}/>
            <label htmlFor={task.id}>{task.name}</label>
        </li>
    );
};

export default TodoItem;