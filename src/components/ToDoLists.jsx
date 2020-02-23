import React, { useContext } from 'react';
import '../scss/ToDoLists.css';
import '../scss/spanEdit.css';
import { ToDoContext } from '../contexts/ToDoContext';
import Task from './Tasks';

const ToDoLists = () => {
  const { myTaskLists, setMyTaskLists } = useContext(ToDoContext);

  const newTask = {
    taskId: new Date().getTime(),
    taskContent: '',
    taskClasses: ['taskItem', 'spanEdit'],
    isTaskDragged: false,
    isTaskDraggedOver: false,
  };

  const addTaskFirst = (listId) => {
    const newListsArray = myTaskLists.slice();
    const myListIndex = newListsArray.findIndex(el => el.listId === listId);
    newListsArray[myListIndex].tasks.unshift(newTask);
    setMyTaskLists(newListsArray);
    localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
    setTimeout(() => document.querySelector('.spanEdit input[type=text]').focus(), 50);
  };

  const addTaskLast = (listId) => {
    const newListsArray = myTaskLists.slice();
    const myListIndex = newListsArray.findIndex(el => el.listId === listId);
    newListsArray[myListIndex].tasks.push(newTask);
    setMyTaskLists(newListsArray);
    localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
    setTimeout(() => document.querySelector('.spanEdit input[type=text]').focus(), 50);
  };

  const listNameShowInput = (listId, event) => {
    const newListsArray = myTaskLists.slice();
    const myListIndex = newListsArray.findIndex(el => el.listId === listId);
    newListsArray[myListIndex].listClasses.push('spanEdit');
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
      if (newListsArray[myListIndex].listClasses.find(el => el === 'spanEdit')) {
        const classToRemoveIndex = newListsArray[myListIndex].listClasses.findIndex(el => el === 'spanEdit');
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

  const taskLists = myTaskLists.map(list => {
    // for every list create all tasks
    const taskItems = list.tasks.map(task => {
      return (
        <Task { ...task } key={task.taskId} />
      );
    });
    return (
      <div className="ToDoList__container" draggable="true" key={list.listId}>
        <div className={list.listClasses.join(' ')}>
          <input type="button" className="defaultButton addTaskBtn addTaskBtn--first" value="&#x02A72;" onClick={() => addTaskFirst(list.listId)} />
          <input type="button" className="defaultButton addTaskBtn addTaskBtn--last" value="&#x2A71;" onClick={() => addTaskLast(list.listId)} />
          <span className="editableSpan" onClick={() => listNameShowInput(list.listId, event)}>{list.listName}</span>
          <input type="text" className="editableInput--list" onBlur={() => listNameEdit(list.listId, event)} onKeyPress={() => listNameEdit(list.listId, event)} />
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
