import React from 'react';
import '../scss/ToDoLists.css';
import '../scss/spanEdit.css';

const ToDoLists = ({lists}) => {
  const taskLists = lists.length ? (
    lists.map(list => {
      return (
        <div className="ToDoList__container" draggable="true" key={list.listId}>
          <div className="ToDoList__nameBar">
            <input type="button" className="defaultButton addTaskButton" value="+"></input>
            <span className="editableSpan">{list.listName}</span>
            <input type="text" className="editableInput"></input>
            <input type="button" className="defaultButton removeDayButton" value="X"></input>
          </div>
        
          <div className="ToDoList__tasks"></div>
        </div>
      );
    })
  ) : (
    <p>You have no tasks left</p>
  );
  return (
    taskLists
  );
};

export default ToDoLists;
