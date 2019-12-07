import React from 'react';
import '../scss/Tasks.css';
import '../scss/spanEdit.css';

const Tasks = ({tasks}) => {
  const taskItems = tasks.map(task => {
    return (
      <div className="taskItem" draggable="true" key={task.taskId}>
        <div className="taskControlBtns">
          <input className="defaultButton prioBtn" type="button" value="P" />
          <input className="defaultButton taskInProgressBtn" type="button" value="&#128336;" />
          <input className="defaultButton removeTaskBtn" type="button" value="X" />
        </div>
        <span className="editableSpan">{task.taskContent}</span>
        <input type="text" className="editableInput" />
      </div>
    );
  });
  return (
    taskItems
  );
}

export default Tasks;
