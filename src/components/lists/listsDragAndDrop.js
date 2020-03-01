import { click } from '../other-features/dragScroll';

export const listDragStartHandler = (listId, event, myTaskLists, setMyTaskLists) => {
  if (event.target.classList.contains('ToDoList__container')) {
    click.mousedown = false;
    event.dataTransfer.setData('text', listId);
    const newListsArray = myTaskLists.slice();
    const draggedListIndex = newListsArray.findIndex(el => el.listId === listId);
    newListsArray[draggedListIndex].draggedList = true;
    setMyTaskLists(newListsArray);
  }
};

export const clearDragAndDropStates = (myTaskLists, setMyTaskLists) => {
  const newListsArray = myTaskLists.map(list => {
    const listDragStateReset = list;
    listDragStateReset.tasks.map(task => {
      const taskDragStateReset = task;
      if (taskDragStateReset.draggedTask) {
        delete taskDragStateReset.draggedTask;
      }
      if (taskDragStateReset.draggedOverTask) {
        delete taskDragStateReset.draggedOverTask;
      }
      if (taskDragStateReset.taskClasses.find(el => el === 'draggedOverItem')) {
        const classToRemoveIndex = taskDragStateReset.taskClasses.findIndex(el => el === 'draggedOverItem');
        taskDragStateReset.taskClasses.splice(classToRemoveIndex, 1);
      }
      return taskDragStateReset;
    });
    if (listDragStateReset.draggedList) {
      delete listDragStateReset.draggedList;
    }
    if (listDragStateReset.draggedOverList) {
      delete listDragStateReset.draggedOverList;
    }
    return listDragStateReset;
  });
  setMyTaskLists(newListsArray);
};

export const listDragOverHandler = (listId, event, myTaskLists) => {
  event.preventDefault();
  const newListsArray = myTaskLists.slice();
  const draggedOverListIndex = newListsArray.findIndex(el => el.listId === listId);
  newListsArray[draggedOverListIndex].draggedOverList = true;
};

export const listDragLeaveHandler = (listId, myTaskLists) => {
  const newListsArray = myTaskLists.slice();
  const dragLeftListIndex = newListsArray.findIndex(el => el.listId === listId);
  delete newListsArray[dragLeftListIndex].draggedOverList;
};

export const listDropHandler = (event, myTaskLists, setMyTaskLists) => {
  event.preventDefault();
  const newListsArray = myTaskLists.slice();

  // drop list on other list or on task on other list
  if (newListsArray.find(list => list.draggedList)) {
    const draggedListIndex = newListsArray.findIndex(list => list.draggedList);
    const draggedList = newListsArray[draggedListIndex];
    const draggedOverListIndex = newListsArray.findIndex(list => list.draggedOverList);

    if (draggedListIndex !== draggedOverListIndex) {
      newListsArray.splice(draggedListIndex, 1);
      newListsArray.splice(draggedOverListIndex, 0, draggedList);
      clearDragAndDropStates(myTaskLists, setMyTaskLists);
      setMyTaskLists(newListsArray);
      localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
    }
  }

  // drop task on the list (not on other task)
  if (!newListsArray.find(list => list.draggedList) && newListsArray.find(list => list.tasks.some(task => task.draggedTask)) && !newListsArray.find(list => list.tasks.some(task => task.draggedOverTask))) {
    const draggedTaskItem = newListsArray.find(list => list.tasks.some(task => task.draggedTask)).tasks.find(task => task.draggedTask);
    const draggedTaskIndex = newListsArray.find(list => list.tasks.some(task => task.draggedTask)).tasks.findIndex(task => task.draggedTask);
    const draggedTaskFromListIndex = newListsArray.findIndex(list => list.tasks.some(task => task.draggedTask));
    const droppedTaskOnListIndex = newListsArray.findIndex(list => list.draggedOverList);

    newListsArray[draggedTaskFromListIndex].tasks.splice(draggedTaskIndex, 1);
    newListsArray[droppedTaskOnListIndex].tasks.push(draggedTaskItem);
    delete newListsArray[droppedTaskOnListIndex].draggedOverList;
    delete draggedTaskItem.draggedTask;
    setMyTaskLists(newListsArray);
    localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
  }
};
