import { click } from '../other-features/dragScroll';

export const taskDragStartHandler = (taskId, event, myTaskLists, setMyTaskLists) => {
  click.mousedown = false;
  event.dataTransfer.setData('text', taskId);
  const newListsArray = myTaskLists.slice();
  const draggedTaskItem = newListsArray.find(list => list.tasks.some(task => task.taskId === taskId)).tasks.find(task => task.taskId === taskId);
  draggedTaskItem.draggedTask = true;
  setMyTaskLists(newListsArray);
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

export const taskDragOverHandler = (taskId, event, myTaskLists) => {
  event.preventDefault();
  const newListsArray = myTaskLists.slice();
  const draggedOverTaskItem = newListsArray.find(list => list.tasks.some(task => task.taskId === taskId)).tasks.find(task => task.taskId === taskId);
  draggedOverTaskItem.draggedOverTask = true;
  if (!draggedOverTaskItem.taskClasses.find(el => el === 'draggedOverItem')) {
    draggedOverTaskItem.taskClasses.push('draggedOverItem');
  }
};

export const taskDragLeaveHandler = (taskId, event, myTaskLists, setMyTaskLists) => {
  const newListsArray = myTaskLists.slice();
  const dragLeftTask = newListsArray.find(list => list.tasks.some(task => task.taskId === taskId)).tasks.find(task => task.taskId === taskId);
  if (dragLeftTask.draggedOverTask) {
    delete dragLeftTask.draggedOverTask;
  }
  if (dragLeftTask.taskClasses.includes('draggedOverItem')) {
    const classToRemoveIndex = dragLeftTask.taskClasses.findIndex(el => el === 'draggedOverItem');
    setTimeout(() => {
      dragLeftTask.taskClasses.splice(classToRemoveIndex, 1);
    }, 50);
  }
  if (!(/(taskControlBtns)|(defaultButton)|(taskItem)|(editableSpan--task)/.test(event.relatedTarget.classList.value)) && dragLeftTask.taskClasses.includes('draggedOverItem')) {
    const classToRemoveIndex = dragLeftTask.taskClasses.findIndex(el => el === 'draggedOverItem');
    dragLeftTask.taskClasses.splice(classToRemoveIndex, 1);
  }
  setMyTaskLists(newListsArray);
};

export const taskDropHandler = (event, myTaskLists, setMyTaskLists) => {
  event.preventDefault();
  const newListsArray = myTaskLists.slice();

  // drop task on other task
  if (newListsArray.find(list => list.tasks.some(task => task.draggedTask)) && newListsArray.find(list => list.tasks.some(task => task.draggedOverTask))) {
    const draggedTaskItem = newListsArray.find(list => list.tasks.some(task => task.draggedTask)).tasks.find(task => task.draggedTask);
    const draggedTaskIndex = newListsArray.find(list => list.tasks.some(task => task.draggedTask)).tasks.findIndex(task => task.draggedTask);
    const draggedTaskFromListIndex = newListsArray.findIndex(list => list.tasks.some(task => task.draggedTask));
    const droppedTaskOnListIndex = newListsArray.findIndex(list => list.draggedOverList);
    const droppedTaskOnTaskIndex = newListsArray.find(list => list.tasks.some(task => task.draggedOverTask)).tasks.findIndex(task => task.draggedOverTask);

    newListsArray[draggedTaskFromListIndex].tasks.splice(draggedTaskIndex, 1);
    newListsArray[droppedTaskOnListIndex].tasks.splice(droppedTaskOnTaskIndex, 0, draggedTaskItem);
    clearDragAndDropStates(myTaskLists, setMyTaskLists);
    setMyTaskLists(newListsArray);
    localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
  }
};
