import { click } from '../other-features/dragScroll';

export const listDragStartHandler = (listId, event, myTaskLists, setMyTaskLists) => {
  if (event.target.classList.contains('ToDoList__container')) {
    click.mousedown = false;
    event.dataTransfer.setData('text', listId);
    const newListsArray = myTaskLists.slice();
    const draggedListIndex = newListsArray.findIndex(el => el.listId === listId);
    newListsArray[draggedListIndex].isListDragged = true;
    setMyTaskLists(newListsArray);
  }
};

export const listDragEndHandler = (myTaskLists, setMyTaskLists) => {
  const newListsArray = myTaskLists.map(list => {
    const listDragStateReset = list;
    listDragStateReset.tasks.map(task => {
      const taskDragStateReset = task;
      taskDragStateReset.isTaskDragged = false;
      taskDragStateReset.isTaskDraggedOver = false;
      if (taskDragStateReset.taskClasses.find(el => el === 'draggedOverItem')) {
        const classToRemoveIndex = taskDragStateReset.taskClasses.findIndex(el => el === 'draggedOverItem');
        taskDragStateReset.taskClasses.splice(classToRemoveIndex, 1);
      }
      return taskDragStateReset;
    });
    listDragStateReset.isListDragged = false;
    listDragStateReset.isListDraggedOver = false;
    return listDragStateReset;
  });
  setMyTaskLists(newListsArray);
};

export const listDragOverHandler = (listId, event, myTaskLists) => {
  event.preventDefault();
  const newListsArray = myTaskLists.slice();
  const draggedOverListIndex = newListsArray.findIndex(el => el.listId === listId);
  newListsArray[draggedOverListIndex].isListDraggedOver = true;
};

export const listDragLeaveHandler = (listId, myTaskLists, setMyTaskLists) => {
  const newListsArray = myTaskLists.slice();
  const dragLeftListIndex = newListsArray.findIndex(el => el.listId === listId);
  newListsArray[dragLeftListIndex].isListDraggedOver = false;
  setMyTaskLists(newListsArray);
};

export const listDropHandler = (myTaskLists, setMyTaskLists) => {
  const newListsArray = myTaskLists.slice();

  // drop list on other list or on task on other list
  if (newListsArray.find(list => list.isListDragged === true)) {
    const droppedListIndex = newListsArray.findIndex(list => list.isListDragged === true);
    const droppedList = newListsArray[droppedListIndex];
    const draggedOverListIndex = newListsArray.findIndex(list => list.isListDraggedOver === true);

    if (droppedListIndex !== draggedOverListIndex) {
      newListsArray.splice(droppedListIndex, 1);
      newListsArray.splice(draggedOverListIndex, 0, droppedList);
      listDragEndHandler(myTaskLists, setMyTaskLists);
      setMyTaskLists(newListsArray);
      localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
    }
  }

  // drop task on the list (not on other task)
  if (!newListsArray.find(list => list.isListDragged === true) && newListsArray.find(list => list.tasks.some(task => task.isTaskDragged === true)) && !newListsArray.find(list => list.tasks.some(task => task.isTaskDraggedOver === true))) {
    const droppedTask = newListsArray.find(list => list.tasks.some(task => task.isTaskDragged === true)).tasks.find(task => task.isTaskDragged === true);
    const droppedTaskIndex = newListsArray.find(list => list.tasks.some(task => task.isTaskDragged === true)).tasks.findIndex(task => task.isTaskDragged === true);
    const droppedTaskFromListIndex = newListsArray.findIndex(list => list.tasks.some(task => task.isTaskDragged === true));
    const droppedTaskOnListIndex = newListsArray.findIndex(list => list.isListDraggedOver === true);

    newListsArray[droppedTaskFromListIndex].tasks.splice(droppedTaskIndex, 1);
    newListsArray[droppedTaskOnListIndex].tasks.push(droppedTask);
    newListsArray[droppedTaskOnListIndex].isListDraggedOver = false;
    droppedTask.isTaskDragged = false;
    setMyTaskLists(newListsArray);
    localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
  }
};
