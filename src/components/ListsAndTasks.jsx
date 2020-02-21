import React, { useContext } from 'react';
import '../scss/ToDoLists.css';
import '../scss/Tasks.css';
import '../scss/spanEdit.css';
import { ToDoContext } from '../contexts/ToDoContext';

const ToDoLists = () => {
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

  const deleteTask = (task) => {
    const newListsArray = myTaskLists.slice();
    for (let list of newListsArray) {
      if (list.tasks.find(el => el === task)) {
        const whichTask = list.tasks.findIndex(el => el === task);
        list.tasks.splice(whichTask, 1);
        setMyTaskLists(newListsArray);
        localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
      }
    }
  };

  const taskContentShowInput = (task, event) => {
    const newListsArray = myTaskLists.slice();
    for (let list of newListsArray) {
      if (list.tasks.find(el => el === task)) {
        const whichTask = list.tasks.findIndex(el => el === task);
        list.tasks[whichTask].taskClasses.push('spanEdit');
        event.target.closest('.taskItem').removeAttribute('draggable');
        event.target.closest('.ToDoList__container').removeAttribute('draggable');
        event.target.nextSibling.value = task.taskContent;
        setTimeout(() => event.target.nextSibling.focus(), 50);
        setMyTaskLists(newListsArray);
      }
    }
  };

  const taskContentEdit = (task, event) => {
    if (event.type === 'blur' || event.key === 'Enter') {
      const newListsArray = myTaskLists.slice();
      for (let list of newListsArray) {
        if (list.tasks.find(el => el === task)) {
          const whichTask = list.tasks.findIndex(el => el === task);
          list.tasks[whichTask].taskContent = event.target.value;
          if (list.tasks[whichTask].taskClasses.find(el => el === 'spanEdit')) {
            const classIndexToRemove = list.tasks[whichTask].taskClasses.findIndex(el => el === 'spanEdit');
            list.tasks[whichTask].taskClasses.splice(classIndexToRemove, 1);
          }
          event.target.closest('.taskItem').setAttribute('draggable', true);
          event.target.closest('.ToDoList__container').setAttribute('draggable', true);
          setMyTaskLists(newListsArray);
          localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
        }
      }
    }
  };

  class NewTask {
    taskId = new Date().getTime();
    taskContent = '';
    taskClasses = ['taskItem', 'spanEdit'];
    isTaskDragged = false;
    isTaskDraggedOver = false;
  }

  const addTaskFirst = (list) => {
    const newListsArray = myTaskLists.slice();
    const whichList = newListsArray.findIndex(el => el === list);
    newListsArray[whichList].tasks.unshift(new NewTask);
    setMyTaskLists(newListsArray);
    localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
    setTimeout(() => document.querySelector('.spanEdit input[type=text]').focus(), 50);
  };

  const addTaskLast = (list) => {
    const newListsArray = myTaskLists.slice();
    const whichList = newListsArray.findIndex(el => el === list);
    newListsArray[whichList].tasks.push(new NewTask);
    setMyTaskLists(newListsArray);
    localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
    setTimeout(() => document.querySelector('.spanEdit input[type=text]').focus(), 50);
  };

  const listNameShowInput = (list, event) => {
    const newListsArray = myTaskLists.slice();
    const whichList = newListsArray.findIndex(el => el === list);
    newListsArray[whichList].listClasses.push('spanEdit');
    event.target.nextSibling.value = list.listName;
    setTimeout(() => event.target.nextSibling.focus(), 50);
    event.target.closest('.ToDoList__container').removeAttribute('draggable');
    setMyTaskLists(newListsArray);
  };

  const listNameEdit = (list, event) => {
    if (event.type === 'blur' || event.key === 'Enter') {
      const newListsArray = myTaskLists.slice();
      const whichList = newListsArray.findIndex(el => el === list);
      newListsArray[whichList].listName = event.target.value;
      if (newListsArray[whichList].listClasses.find(el => el === 'spanEdit')) {
        const classIndexToRemove = newListsArray[whichList].listClasses.findIndex(el => el === 'spanEdit');
        newListsArray[whichList].listClasses.splice(classIndexToRemove, 1);
      }
      event.target.closest('.ToDoList__container').setAttribute('draggable', true);
      setMyTaskLists(newListsArray);
      localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
    }
  };

  const deleteList = (listId) => {
    if (confirm('Remove this list?')) {
      const newListsArray = myTaskLists.filter(item => {
        return (
          item.listId !== listId
        );
      });
      setMyTaskLists(newListsArray);
      localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
    }
  };

  const taskLists = myTaskLists.map(list => {
    // for every list create all tasks
    const taskItems = list.tasks.map(task => {
      return (
      // wyrzucone stąd na razie wszystko związane z d'n'd - zostawić na koniec, jak reszta będzie działać i zajrzeć do starej wersji
        <div className={task.taskClasses.join(' ')} draggable="true" key={task.taskId}>
          <div className="taskControlBtns">
            <input className="defaultButton prioBtn" type="button" value="P" onClick={() => prioTask(task.taskId)} />
            <input className="defaultButton taskInProgressBtn" type="button" value="&#128336;" onClick={() => taskInProgress(task.taskId)} />
            <input className="defaultButton removeTaskBtn" type="button" value="X" onClick={() => deleteTask(task)} />
          </div>
          <span className="editableSpan" onClick={() => taskContentShowInput(task, event)}>{task.taskContent}</span>
          <input type="text" className="editableInput--task" onBlur={() => taskContentEdit(task, event)} onKeyPress={() => taskContentEdit(task, event)} />
        </div>
      );
    });
    return (
      <div className="ToDoList__container" draggable="true" key={list.listId}>
        <div className={list.listClasses.join(' ')}>
          <input type="button" className="defaultButton addTaskBtn addTaskBtn--first" value="&#x02A72;" onClick={() => addTaskFirst(list)} />
          <input type="button" className="defaultButton addTaskBtn addTaskBtn--last" value="&#x2A71;" onClick={() => addTaskLast(list)} />
          <span className="editableSpan" onClick={() => listNameShowInput(list, event)}>{list.listName}</span>
          <input type="text" className="editableInput--list" onBlur={() => listNameEdit(list, event)} onKeyPress={() => listNameEdit(list, event)} />
          <input type="button" className="defaultButton removeDayButton" value="X" onClick={() => deleteList(list.listId)} />
        </div>

        <div className="ToDoList__tasks">
          {/* here we added all tasks created at the top of this fn */}
          {taskItems}
        </div>
      </div>
    );
  });
  return (
    taskLists
  );
};

export default ToDoLists;
