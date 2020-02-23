import React, { useContext } from 'react';
import { ToDoContext } from '../contexts/ToDoContext';
import '../scss/Tasks.css';
import '../scss/spanEdit.css';

const Task = (task) => {
  const { myTaskLists, setMyTaskLists } = useContext(ToDoContext);

  const prioTask = (taskId) => {
    const newListsArray = myTaskLists.slice();
    // find list which contains task with specified taskId, then find that task in that list 
    const myTask = newListsArray.find(list => list.tasks.some(task => task.taskId === taskId)).tasks.find(task => task.taskId === taskId);
    if (!myTask.taskClasses.find(el => el === 'prioTask')) {
      myTask.taskClasses.push('prioTask')
    } else {
      const classToRemove = myTask.taskClasses.findIndex(el => el === 'prioTask');
      myTask.taskClasses.splice(classToRemove, 1);
    }
    setMyTaskLists(newListsArray);
    localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
  };

  const taskInProgress = (taskId) => {
    const newListsArray = myTaskLists.slice();
    const myTask = newListsArray.find(list => list.tasks.some(task => task.taskId === taskId)).tasks.find(task => task.taskId === taskId);
    if (!myTask.taskClasses.find(el => el === 'taskInProgress')) {
      myTask.taskClasses.push('taskInProgress')
    } else {
      const classToRemove = myTask.taskClasses.findIndex(el => el === 'taskInProgress');
      myTask.taskClasses.splice(classToRemove, 1);
    }
    setMyTaskLists(newListsArray);
    localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
  };

  const deleteTask = (taskId) => {
    const newListsArray = myTaskLists.slice();
    const myListIndex = newListsArray.findIndex(list => list.tasks.some(task => task.taskId === taskId));
    const myTaskIndex = newListsArray[myListIndex].tasks.findIndex(task => task.taskId === taskId);
    newListsArray[myListIndex].tasks.splice(myTaskIndex, 1);
    setMyTaskLists(newListsArray);
    localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
  };

  const taskContentShowInput = (taskId, event) => {
    const newListsArray = myTaskLists.slice();
    const myTask = newListsArray.find(list => list.tasks.some(task => task.taskId === taskId)).tasks.find(task => task.taskId === taskId);
    myTask.taskClasses.push('spanEdit');
    event.target.closest('.taskItem').removeAttribute('draggable');
    event.target.closest('.ToDoList__container').removeAttribute('draggable');
    event.target.nextSibling.value = myTask.taskContent;
    setTimeout(() => event.target.nextSibling.focus(), 50);
    setMyTaskLists(newListsArray);
  };

  const taskContentEdit = (taskId, event) => {
    if (event.type === 'blur' || event.key === 'Enter') {
      const newListsArray = myTaskLists.slice();
      const myTask = newListsArray.find(list => list.tasks.some(task => task.taskId === taskId)).tasks.find(task => task.taskId === taskId);
      myTask.taskContent = event.target.value;
      if (myTask.taskClasses.find(el => el === 'spanEdit')) {
        const classToRemoveIndex = myTask.taskClasses.findIndex(el => el === 'spanEdit');
        myTask.taskClasses.splice(classToRemoveIndex, 1)
      }
      event.target.closest('.taskItem').setAttribute('draggable', true);
      event.target.closest('.ToDoList__container').setAttribute('draggable', true);
      setMyTaskLists(newListsArray);
      localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
    }
  };

  return (
      // wyrzucone stąd na razie wszystko związane z d'n'd - zostawić na koniec, jak reszta będzie działać i zajrzeć do starej wersji
    <div className={task.taskClasses.join(' ')} draggable="true">
      <div className="taskControlBtns">
        <input className="defaultButton prioBtn" type="button" value="P" onClick={() => prioTask(task.taskId)} />
        <input className="defaultButton taskInProgressBtn" type="button" value="&#128336;" onClick={() => taskInProgress(task.taskId)} />
        <input className="defaultButton removeTaskBtn" type="button" value="X" onClick={() => deleteTask(task.taskId)} />
      </div>
      <span className="editableSpan" onClick={() => taskContentShowInput(task.taskId, event)}>{task.taskContent}</span>
      <input type="text" className="editableInput--task" onBlur={() => taskContentEdit(task.taskId, event)} onKeyPress={() => taskContentEdit(task.taskId, event)} />
    </div>
  );
};

export default Task;
