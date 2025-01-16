import React, { useState, useRef, useEffect } from "react";
import styles from "./TodoItem.module.css";

function TodoItem({ task, toggleTaskCompletion, deleteTask }) {
    const [isSwiped, setIsSwiped] = useState(false);
    const [startX, setStartX] = useState(0);
    const [isScrollable, setIsScrollable] = useState(false);
    const taskTextRef = useRef(null);
    useEffect(() => {
        const taskText = taskTextRef.current;
        if (taskText) {
            // const containerWidth = taskText.parentElement.offsetWidth - 100 ; 
            const textWidth = Number(task.name.length); 
            if(window.innerWidth < 768){
              setIsScrollable(textWidth > 20);
            } else {
              setIsScrollable(textWidth > 50); // Jeśli tekst jest szerszy niż kontener, ustawiamy stan na scrollable
            }
            
        }
    }, [task.name]);
    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX); 
    };

    const handleTouchMove = (e) => {
        const moveX = e.touches[0].clientX - startX; 
        if (moveX < -50) {
            setIsSwiped(true);
        }
    };

    const handleTouchEnd = () => {
        if (isSwiped) {
            setTimeout(() => deleteTask(task.id), 300);
        }
        setIsSwiped(false);
    };
    return (
        <li
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`${styles["todo-item"]} ${
                task.completed ? styles["completed"] : ""
            } ${isSwiped ? styles["swiped"] : ""}`}
        >
            <input
                type="checkbox"
                checked={task.completed}
                id={task.id}
                onChange={() => {
                  toggleTaskCompletion(task.id);}
                }
            />
            <label htmlFor={task.id}>
                <span
                    ref={taskTextRef}
                    className={`${isScrollable ? styles.scrollable : ""}`}
                >
                    {task.name}
                </span>
            </label>
            <span
                className={styles["delete-btn"]}
                onClick={() => deleteTask(task.id)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="24px"
                    height="24px"
                    stroke="currentColor"
                >
                    <path d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>
        </li>
    );
}

export default TodoItem;
