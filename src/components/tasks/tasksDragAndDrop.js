import { click } from '../other-features/dragScroll';

export const taskDragStartHandler = (taskId, event, myTaskLists, setMyTaskLists) => {
  click.mousedown = false;
  event.dataTransfer.setData('text', taskId);
  const newListsArray = myTaskLists.slice();
  const draggedTask = newListsArray.find(list => list.tasks.some(task => task.taskId === taskId)).tasks.find(task => task.taskId === taskId);
  draggedTask.isTaskDragged = true;
  setMyTaskLists(newListsArray);
};

export const taskDragEndHandler = (myTaskLists, setMyTaskLists) => {
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

export const taskDragOverHandler = (taskId, event, myTaskLists) => {
  event.preventDefault();
  const newListsArray = myTaskLists.slice();
  const draggedOverTask = newListsArray.find(list => list.tasks.some(task => task.taskId === taskId)).tasks.find(task => task.taskId === taskId);
  draggedOverTask.isTaskDraggedOver = true;
  if (!draggedOverTask.taskClasses.find(el => el === 'draggedOverItem')) {
    draggedOverTask.taskClasses.push('draggedOverItem');
  }
};

export const taskDragLeaveHandler = (taskId, myTaskLists, setMyTaskLists) => {
  const newListsArray = myTaskLists.slice();
  const dragLeftTask = newListsArray.find(list => list.tasks.some(task => task.taskId === taskId)).tasks.find(task => task.taskId === taskId);
  if (dragLeftTask.taskClasses.includes('draggedOverItem')) {
    dragLeftTask.isTaskDraggedOver = false;
    const classToRemoveIndex = dragLeftTask.taskClasses.findIndex(el => el === 'draggedOverItem');
    setTimeout(() => {
      dragLeftTask.taskClasses.splice(classToRemoveIndex, 1);
    }, 50);
  }
  setMyTaskLists(newListsArray);
};

export const taskDropHandler = (myTaskLists, setMyTaskLists) => {
  const newListsArray = myTaskLists.slice();

  // drop task on other task
  if (newListsArray.find(list => list.tasks.some(task => task.isTaskDragged === true)) && newListsArray.find(list => list.tasks.some(task => task.isTaskDraggedOver === true))) {
    const droppedTask = newListsArray.find(list => list.tasks.some(task => task.isTaskDragged === true)).tasks.find(task => task.isTaskDragged === true);
    const droppedTaskIndex = newListsArray.find(list => list.tasks.some(task => task.isTaskDragged === true)).tasks.findIndex(task => task.isTaskDragged === true);
    const droppedTaskFromListIndex = newListsArray.findIndex(list => list.tasks.some(task => task.isTaskDragged === true));
    const droppedTaskOnListIndex = newListsArray.findIndex(list => list.isListDraggedOver === true);
    const droppedTaskOnTaskIndex = newListsArray.find(list => list.tasks.some(task => task.isTaskDraggedOver === true)).tasks.findIndex(task => task.isTaskDraggedOver === true);

    newListsArray[droppedTaskFromListIndex].tasks.splice(droppedTaskIndex, 1);
    newListsArray[droppedTaskOnListIndex].tasks.splice(droppedTaskOnTaskIndex, 0, droppedTask);
    taskDragEndHandler(myTaskLists, setMyTaskLists);
    setMyTaskLists(newListsArray);
    localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
  }
};
