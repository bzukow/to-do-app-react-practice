import React, {useState} from 'react';
import styles from './TodoItem.module.css';
import { useSwipeable } from 'react-swipeable';

function TodoItem({task, toggleTaskCompletion, deleteTask}){
    const [isSwiped, setIsSwiped] = useState(false);
    const [startX, setStartX] = useState(0);

    // const swipeHandlers = useSwipeable({
    //     onSwipedLeft: () => {
    //         setIsSwiped(true);
    //         setTimeout(() => deleteTask(task.id), 300);
    //     },
    //     preventDefaultTouchmoveEvent: true,
    //     trackMouse: true,
    // });
    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);  // Zapisujemy punkt początkowy swipe'a
      };
    
      const handleTouchMove = (e) => {
        const moveX = e.touches[0].clientX - startX; // Obliczamy ruch
        if (moveX < -50) { // Jeśli swipe jest większy niż 50px, traktujemy to jako usunięcie
          setIsSwiped(true);
        }
      };
    
      const handleTouchEnd = () => {
        if (isSwiped) {
          // Kiedy swipe jest zakończony, usuwamy element
          deleteTask(task.id);
        }
        setIsSwiped(false); // Resetujemy stan
      };
    return (
        <li onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`${styles['todo-item']} ${task.completed ? styles.completed : ""} ${isSwiped ? 'swiped' : ''}`}>
            <input type="checkbox" checked={task.completed} id={task.id} onChange={() => toggleTaskCompletion(task.id)}/>
            <label htmlFor={task.id}>{task.name}</label>
            <span className={styles['delete-btn']} onClick={() => deleteTask(task.id)}>
            <svg 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  viewBox="0 0 24 24" 
  width="24px"
  height="24px"
  stroke="currentColor">
  <path 
    d="M6 18L18 6M6 6l12 12" />
</svg>

            </span>
        </li>
    );
};

export default TodoItem;