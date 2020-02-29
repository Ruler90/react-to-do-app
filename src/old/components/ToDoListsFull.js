import React from 'react';
import '../scss/ToDoLists.css';
import '../scss/Tasks.css';
import '../scss/spanEdit.css';

export class NewTask {
  taskId = new Date().getTime();
  taskContent = '';
  taskClasses = ['taskItem', 'spanEdit'];
  isTaskDragged = false;
  isTaskDraggedOver = false;
}


const ToDoLists = ({lists, ...props}) => {
  const taskLists = lists.map(list => {
    // for every list create all tasks
    const taskItems = list.tasks.map(task => {
      return (
        <div className={task.taskClasses.join(' ')} draggable="true" key={task.taskId} onDragStart={() => props.taskDragStartHandler(list.listId, task.taskId, event)} onDragEnd={() => props.taskDragEndHandler()} onDragOver={() => props.taskDragOverHandler(event, list.listId, task.taskId)} onDragLeave={() => props.taskDragLeaveHandler(list.listId, task.taskId)} onDrop={() => props.dropHandler()}>
          <div className="taskControlBtns">
            <input className="defaultButton prioBtn" type="button" value="P" onClick={() => props.prioTask(task)} />
            <input className="defaultButton taskInProgressBtn" type="button" value="&#128336;" onClick={() => props.taskInProgress(task)} />
            <input className="defaultButton removeTaskBtn" type="button" value="X" onClick={() => props.deleteTask(task)} />
          </div>
          <span className="editableSpan" onClick={() => props.taskContentShowInput(task, event)}>{task.taskContent}</span>
          <input type="text" className="editableInput--task" onBlur={() => props.taskContentEdit(task, event)} onKeyPress={() => props.taskContentEdit(task, event)}/>
        </div>
      );
    });
    return (
      <div className="ToDoList__container" draggable="true" key={list.listId} onDragStart={() => props.listDragStartHandler(list.listId, event)} onDragEnd={() => props.listDragEndHandler()} onDragOver={() => props.listDragOverHandler(event, list.listId)} onDragLeave={() => props.listDragLeaveHandler(list.listId)} onDrop={() => props.dropHandler()}>
        <div className={list.listClasses.join(' ')}>
          <input type="button" className="defaultButton addTaskBtn addTaskBtn--first" value="&#x02A72;" onClick={() => props.addTaskFirst(list)}></input>
          <input type="button" className="defaultButton addTaskBtn addTaskBtn--last" value="&#x2A71;" onClick={() => props.addTaskLast(list)}></input>
          <span className="editableSpan" onClick={() => props.listNameShowInput(list, event)}>{list.listName}</span>
          <input type="text" className="editableInput--list" onBlur={() => props.listNameEdit(list, event)} onKeyPress={() => props.listNameEdit(list, event)}></input>
          <input type="button" className="defaultButton removeDayButton" value="X" onClick={() => props.deleteList(list.listId)}></input>
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
