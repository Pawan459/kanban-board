import styles from './DragAndDrop.module.scss';
import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateTaskList } from '../../reducers/tasklists/actions';
import AddTask from './AddTask/AddTask';
import InlineCard from './InlineCard/InlineCard';


export default function DragAndDrop() {

  const dispatch = useDispatch();
  // selectors
  const { taskList } = useSelector(state => state.taskList);

  // states
  const [dragging, setDragging] = useState(false);

  //refs
  const dragItem = useRef();
  const dragNode = useRef();

  useEffect(() => {
    const persistedTaskList = localStorage.getItem('taskList');
    if (persistedTaskList) {
      dispatch(updateTaskList(JSON.parse(persistedTaskList)))
    }
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList])

  const handleDragStart = (event) => {
    event.dataTransfer.effectAllowed = 'move';
    const params = event.currentTarget.dataset;

    dragItem.current = params;
    dragNode.current = event.target;

    dragNode.current.addEventListener('dragend', handleDragEnd);
  }

  const handleDragEnd = (event) => {
    // remove the event listener from the node
    dragNode.current.removeEventListener('dragend', handleDragEnd, false);

    // reset the refs
    dragItem.current = null;
    dragNode.current = null;
    setDragging(false);
  }

  const handleDragEnter = (event) => {
    event.dataTransfer.dropEffect = 'move';
    const params = event.currentTarget.dataset;
    const { current } = dragItem;

    const fromIndex = current.itemIndex;
    const toIndex = params.itemIndex;

    if (toIndex > -1) {
      taskList[params.groupIndex].tasks.splice(
        toIndex,
        0,
        ...taskList[current.groupIndex].tasks.splice(
          fromIndex,
          1
        )
      );
      dragItem.current = params;
      dispatch(updateTaskList([...taskList]));
    }
  }

  const getClassName = (params) => {
    const { current } = dragItem;

    return (dragging
      && +current?.groupIndex === params.groupIndex
      && +current?.itemIndex === params.itemIndex)
      ? 'current'
      : '';
  }

  const renderDragItems = (group, groupIndex) => {
    if (Array.isArray(group?.tasks)) {
      return group.tasks.map((item, itemIndex) => (
        <div
          key={itemIndex}
          draggable
          onDrag={!dragging ? (() => setDragging(true)) : null}
          data-item-index={itemIndex}
          data-group-index={groupIndex}
          onDragStart={(event) => handleDragStart(event)}
          onDragEnter={handleDragEnter}
          className={`${styles[`dnd-item`]} ${styles[getClassName({ groupIndex, itemIndex })] || ''}`}
        >
          {<InlineCard {...item} />}
        </div>
      ))
    }
  }

  const renderGroups = () => {
    if (!taskList || !Array.isArray(taskList)) return null;

    return taskList.map((group, groupIndex) => (
      <div
        role='tabpanel'
        aria-labelledby={group.title}
        id={group.title}
        tabIndex={0}
        className={styles['dnd-group']}
        key={group.title}
        data-item-index={0}
        data-group-index={groupIndex}
        style={{ backgroundColor: group.color }}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={!taskList[groupIndex].tasks.length && dragging ? ((event) => handleDragEnter(event)) : null}
      >
        <h2 className={styles["dnd-group-heading"]}>{group.title}</h2>
        {renderDragItems(group, groupIndex)}
        <AddTask groupIndex={groupIndex} />
      </div>
    ))
  }

  return (
    <div className={styles['drag-and-drop']} role='tablist'>
      {renderGroups()}
      <AddTask title='Group' />
    </div>
  )
}
