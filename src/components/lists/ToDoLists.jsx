import React, { useContext } from 'react';
import './scss/ToDoLists.css';
import { ToDoContext } from '../../contexts/ToDoContext';
import Task from '../tasks/Tasks';
import { listDragStartHandler, listDragEndHandler, listDragOverHandler, listDragLeaveHandler, listDropHandler } from './listsDragAndDrop';

const ToDoLists = () => {
  const { myTaskLists, setMyTaskLists } = useContext(ToDoContext);

  const newTask = {
    taskId: new Date().getTime(),
    taskContent: '',
    taskClasses: ['taskItem', 'spanEdit--task'],
    isTaskDragged: false,
    isTaskDraggedOver: false,
  };

  const addTaskFirst = (listId) => {
    const newListsArray = myTaskLists.slice();
    const myListIndex = newListsArray.findIndex(el => el.listId === listId);
    newListsArray[myListIndex].tasks.unshift(newTask);
    setMyTaskLists(newListsArray);
    localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
    setTimeout(() => document.querySelector('.spanEdit--task textarea').focus(), 50);
  };

  const addTaskLast = (listId) => {
    const newListsArray = myTaskLists.slice();
    const myListIndex = newListsArray.findIndex(el => el.listId === listId);
    newListsArray[myListIndex].tasks.push(newTask);
    setMyTaskLists(newListsArray);
    localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
    setTimeout(() => document.querySelector('.spanEdit--task textarea').focus(), 50);
  };

  const listNameShowInput = (listId, event) => {
    const newListsArray = myTaskLists.slice();
    const myListIndex = newListsArray.findIndex(el => el.listId === listId);
    newListsArray[myListIndex].listClasses.push('spanEdit--list');
    event.target.nextSibling.value = newListsArray[myListIndex].listName;
    setTimeout(() => event.target.nextSibling.focus(), 50);
    event.target.closest('.ToDoList__container').removeAttribute('draggable');
    setMyTaskLists(newListsArray);
  };

  const listNameEdit = (listId, event) => {
    if (event.type === 'blur' || event.key === 'Enter') {
      const newListsArray = myTaskLists.slice();
      const myListIndex = newListsArray.findIndex(el => el.listId === listId);
      newListsArray[myListIndex].listName = event.target.value;
      if (newListsArray[myListIndex].listClasses.find(el => el === 'spanEdit--list')) {
        const classToRemoveIndex = newListsArray[myListIndex].listClasses.findIndex(el => el === 'spanEdit--list');
        newListsArray[myListIndex].listClasses.splice(classToRemoveIndex, 1);
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

  const taskLists = myTaskLists.map(list => (
    <div className="ToDoList__container" draggable="true" key={list.listId} onDragStart={() => listDragStartHandler(list.listId, event, myTaskLists, setMyTaskLists)} onDragEnd={() => listDragEndHandler(myTaskLists, setMyTaskLists)} onDragOver={() => listDragOverHandler(list.listId, event, myTaskLists)} onDragLeave={() => listDragLeaveHandler(list.listId, myTaskLists, setMyTaskLists)} onDrop={() => listDropHandler(myTaskLists, setMyTaskLists)}>
      <div className={list.listClasses.join(' ')}>
        <input type="button" className="defaultButton addTaskBtn addTaskBtn--first" value="&#x02A72;" onClick={() => addTaskFirst(list.listId)} />
        <input type="button" className="defaultButton addTaskBtn addTaskBtn--last" value="&#x2A71;" onClick={() => addTaskLast(list.listId)} />
        <span className="editableSpan--list" onClick={() => listNameShowInput(list.listId, event)}>{list.listName}</span>
        <input type="text" className="editableInput--list" onBlur={() => listNameEdit(list.listId, event)} onKeyPress={() => listNameEdit(list.listId, event)} />
        <input type="button" className="defaultButton removeDayButton" value="X" onClick={() => deleteList(list.listId)} />
      </div>

      <div className="ToDoList__tasks">
        {list.tasks.map(task => (
          <Task { ...task } key={task.taskId} />
        ))}
      </div>
    </div>
  ));
  return (
    taskLists
  );
};

export default ToDoLists;
