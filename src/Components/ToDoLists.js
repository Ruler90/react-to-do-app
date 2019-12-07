import React from 'react';
import Tasks from './Tasks';
import '../scss/ToDoLists.css';
import '../scss/spanEdit.css';

const ToDoLists = ({lists, deleteList}) => {
  const taskLists = lists.map(list => {
    return (
      <div className="ToDoList__container" draggable="true" key={list.listId}>
        <div className="ToDoList__nameBar">
          <input type="button" className="defaultButton addTaskButton" value="+"></input>
          <span className="editableSpan">{list.listName}</span>
          <input type="text" className="editableInput"></input>
          <input type="button" className="defaultButton removeDayButton" value="X" onClick={() => deleteList(list.listId)}></input>
        </div>
        
        <div className="ToDoList__tasks">
          <Tasks tasks={list.tasks}/>
        </div>
      </div>
    );
  });
  return (
    taskLists
  );
};

export default ToDoLists;
