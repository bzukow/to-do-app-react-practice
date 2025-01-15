import React, {useState} from 'react';
import TodoItem from './TodoItem';
import styles from "./TodoList.module.css";

function TodoList({tasks, toggleTaskCompletion, addTask, deleteTask}){
    const [newTask, setNewTask] = useState([]);
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
        <div className={styles['todo-list']}>
            <h2 className={styles["h2-custom"]}>
                Tasks to do &#10024;
            </h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder='Add new task' />
            </form>
            {tasks.length > 0 ? (
                <ul>
                    {tasks.map((task) => (
                    <TodoItem key={task.id} task={task} toggleTaskCompletion={toggleTaskCompletion} deleteTask={deleteTask}/>
                    ))}
                </ul>
            ) : (
                <p className={styles['todo-list-loading']}>Loading tasks...</p>
            )}
        </div>
    );
};

export default TodoList;