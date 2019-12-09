import React from 'react';
import Tasks from './Tasks';
import '../scss/ToDoLists.css';
import '../scss/spanEdit.css';

const ToDoLists = ({lists, deleteList, listNameShowInput, listNameEdit, taskContentShowInput, taskContentEdit}) => {
  const taskLists = lists.map(list => {
    return (
      <div className="ToDoList__container" draggable="true" key={list.listId}>
        <div className={list.listClasses.join(' ')}>
          <input type="button" className="defaultButton addTaskButton" value="+"></input>
          <span className="editableSpan" onClick={() => listNameShowInput(list, event)}>{list.listName}</span>
          <input type="text" className="editableInput--list" onBlur={() => listNameEdit(list, event)} onKeyPress={() => listNameEdit(list, event)}></input>
          <input type="button" className="defaultButton removeDayButton" value="X" onClick={() => deleteList(list.listId)}></input>
        </div>
        
        <div className="ToDoList__tasks">
          <Tasks list={list} taskContentShowInput={taskContentShowInput} taskContentEdit={taskContentEdit}/>
        </div>
      </div>
    );
  });
  return (
    taskLists
  );
};

export default ToDoLists;
