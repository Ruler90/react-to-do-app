import React from 'react';
import '../scss/ToDoLists.css';
import '../scss/Tasks.css';
import '../scss/spanEdit.css';



const ToDoLists = ({lists, deleteList, listNameShowInput, listNameEdit, taskContentShowInput, taskContentEdit}) => {
  const taskLists = lists.map(list => {
    // for every list create all tasks
    const taskItems = list.tasks.map(task => {
      return (
        <div className={task.taskClasses.join(' ')} draggable="true" key={task.taskId}>
          <div className="taskControlBtns">
            <input className="defaultButton prioBtn" type="button" value="P" />
            <input className="defaultButton taskInProgressBtn" type="button" value="&#128336;" />
            <input className="defaultButton removeTaskBtn" type="button" value="X" />
          </div>
          <span className="editableSpan" onClick={() => taskContentShowInput(task, event)}>{task.taskContent}</span>
          <input type="text" className="editableInput--task" onBlur={() => taskContentEdit(task, event)} onKeyPress={() => taskContentEdit(task, event)}/>
        </div>
      );
    });
    return (
      <div className="ToDoList__container" draggable="true" key={list.listId}>
        <div className={list.listClasses.join(' ')}>
          <input type="button" className="defaultButton addTaskButton" value="+"></input>
          <span className="editableSpan" onClick={() => listNameShowInput(list, event)}>{list.listName}</span>
          <input type="text" className="editableInput--list" onBlur={() => listNameEdit(list, event)} onKeyPress={() => listNameEdit(list, event)}></input>
          <input type="button" className="defaultButton removeDayButton" value="X" onClick={() => deleteList(list.listId)}></input>
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
