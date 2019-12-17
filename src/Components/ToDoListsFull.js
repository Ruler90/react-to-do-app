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


const ToDoLists = ({lists, deleteList, listNameShowInput, listNameEdit, addTaskFirst, addTaskLast, deleteTask, taskContentShowInput, taskContentEdit, prioTask, taskInProgress, listDragStartHandler, listDragEndHandler, listDragOverHandler, listDragLeaveHandler, taskDragStartHandler, taskDragEndHandler, taskDragOverHandler, taskDragLeaveHandler, dropHandler}) => {
  const taskLists = lists.map(list => {
    // for every list create all tasks
    const taskItems = list.tasks.map(task => {
      return (
        <div className={task.taskClasses.join(' ')} draggable="true" key={task.taskId} onDragStart={() => taskDragStartHandler(list.listId, task.taskId, event)} onDragEnd={() => taskDragEndHandler()} onDragOver={() => taskDragOverHandler(event, list.listId, task.taskId)} onDragLeave={() => taskDragLeaveHandler(list.listId, task.taskId)} onDrop={() => dropHandler()}>
          <div className="taskControlBtns">
            <input className="defaultButton prioBtn" type="button" value="P" onClick={() => prioTask(task)} />
            <input className="defaultButton taskInProgressBtn" type="button" value="&#128336;" onClick={() => taskInProgress(task)} />
            <input className="defaultButton removeTaskBtn" type="button" value="X" onClick={() => deleteTask(task)} />
          </div>
          <span className="editableSpan" onClick={() => taskContentShowInput(task, event)}>{task.taskContent}</span>
          <input type="text" className="editableInput--task" onBlur={() => taskContentEdit(task, event)} onKeyPress={() => taskContentEdit(task, event)}/>
        </div>
      );
    });
    return (
      <div className="ToDoList__container" draggable="true" key={list.listId} onDragStart={() => listDragStartHandler(list.listId, event)} onDragEnd={() => listDragEndHandler()} onDragOver={() => listDragOverHandler(event, list.listId)} onDragLeave={() => listDragLeaveHandler(list.listId)} onDrop={() => dropHandler()}>
        <div className={list.listClasses.join(' ')}>
          <input type="button" className="defaultButton addTaskBtn addTaskBtn--first" value="&#x02A72;" onClick={() => addTaskFirst(list)}></input>
          <input type="button" className="defaultButton addTaskBtn addTaskBtn--last" value="&#x2A71;" onClick={() => addTaskLast(list)}></input>
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
