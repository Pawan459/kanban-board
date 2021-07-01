import styles from './AddTask.module.scss';
import React, { useRef, useState, useCallback } from "react";
import { useDispatch } from 'react-redux';

import { addTaskListGroup, updateTasksAtGroup } from '../../../reducers/tasklists/actions';
import { getRandomColor } from '../../../utils/helper';
import useOutsideAlerter from '../../../hooks/useOutsideAlerter';

// component only specific to Drag and Drop
export default function AddTask({
  groupIndex,
  title = 'Card'
}) {

  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const parentRef = useRef(null);
  const toggleCard = useCallback(() => setOpen(open => !open), [])

  useOutsideAlerter(parentRef, toggleCard);

  const renderAddToCard = () => (
    <div className={styles['add-task']}>
      <div className={styles["action-buttons"]}>
        <button className={styles['add-action-btn']} onClick={toggleCard}>
          <span className={styles["add"]}>+</span>
          Add a {title}
        </button>
      </div>
    </div>
  )

  const addCardToList = (event) => {
    event.preventDefault();
    if (text) {
      const payload = {
        title: text
      }

      if (title.toLowerCase() === 'group') {
        payload.color = getRandomColor();
        payload.tasks = [];
        dispatch(addTaskListGroup(payload));
      }
      else dispatch(updateTasksAtGroup(groupIndex, payload));

      setText("");
      toggleCard();
    }
  }

  const renderInlineAddToCard = () => (
    <div ref={parentRef} className={styles['add-task']}>
      <form onSubmit={addCardToList} className={styles['card']}>
        <input
          autoFocus
          className={`${styles['inline-text']} ${styles[title.toLowerCase() === 'group' ? 'inline-group' : ''] || ''}`}
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <div className={styles["action-buttons"]}>
          <button type='submit' className={`${styles['add-action-btn']} ${styles['inline-active']}`}>
            Add {title}
          </button>
          <button onClick={toggleCard} className={styles["close-btn"]}>&times;</button>
        </div>
      </form>
    </div>
  )

  return open ? renderInlineAddToCard() : renderAddToCard();
}
