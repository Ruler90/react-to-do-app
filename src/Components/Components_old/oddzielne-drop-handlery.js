listDropHandler = () => {
    const newListsArray = this.state.lists.slice();
    let draggedTaskWhichList, draggedTaskIndex, draggedTaskId, draggedTask, draggedListId, draggedOverList, draggedOverTaskIndex, draggedOverTaskId;
    for (let [index, list] of newListsArray.entries()) {

      if (list.tasks.find(el => el.isTaskDragged)) {
        draggedTaskWhichList = index;
        draggedTaskIndex = list.tasks.findIndex(el => el.isTaskDragged);
        draggedTaskId = list.tasks[draggedTaskIndex].taskId;
        draggedTask = list.tasks.find(el => el.isTaskDragged);
      }

      if (list.tasks.find(el => el.isTaskDraggedOver)) {
        draggedOverTaskIndex = list.tasks.findIndex(el => el.isTaskDraggedOver);
        draggedOverTaskId = list.tasks[draggedOverTaskIndex].taskId;
      }

      if (list.isListDraggedOver) {
        draggedOverList = index;
      }
    }

    if (draggedTaskId !== undefined && draggedTaskId !== draggedOverTaskId && draggedListId === undefined && draggedOverList !== undefined) {
      newListsArray[draggedTaskWhichList].tasks.splice(draggedTaskIndex, 1);
      newListsArray[draggedOverList].tasks.push(draggedTask);
      newListsArray[draggedOverList].isListDraggedOver = false;
      draggedTask.isTaskDragged = false;
      // const classIndexToToggle = draggedOverTask.taskClasses.findIndex(el => el === 'draggedOverItem');
      // draggedOverTask.taskClasses.splice(classIndexToToggle, 1);
      this.setState({
        lists: newListsArray
      });
    }
  }


  taskDropHandler = () => {
    const newListsArray = this.state.lists.slice();
    let draggedTaskWhichList, draggedTaskIndex, draggedTaskId, draggedTask, draggedOverTaskWhichList, draggedOverTaskIndex, draggedOverTaskId, draggedOverTask;
    for (let [index, list] of newListsArray.entries()) {

      if (list.tasks.find(el => el.isTaskDragged)) {
        draggedTaskWhichList = index;
        draggedTaskIndex = list.tasks.findIndex(el => el.isTaskDragged);
        draggedTaskId = list.tasks[draggedTaskIndex].taskId;
        draggedTask = list.tasks.find(el => el.isTaskDragged);
      }

      if (list.tasks.find(el => el.isTaskDraggedOver)) {
        draggedOverTaskWhichList = index;
        draggedOverTaskIndex = list.tasks.findIndex(el => el.isTaskDraggedOver);
        draggedOverTaskId = list.tasks[draggedOverTaskIndex].taskId;
        draggedOverTask = list.tasks.find(el => el.isTaskDraggedOver);
      }
    }

    // if (draggedTaskWhichList !== draggedOverTaskWhichList && draggedTaskId !== draggedOverTaskId || draggedTaskWhichList === draggedOverTaskWhichList && draggedTaskId !== draggedOverTaskId && draggedOverTaskId !== null) {
    if (draggedTaskId !== undefined && draggedOverTaskId !== undefined && draggedTaskId !== draggedOverTaskId) {
      newListsArray[draggedTaskWhichList].tasks.splice(draggedTaskIndex, 1);
      newListsArray[draggedOverTaskWhichList].tasks.splice(draggedOverTaskIndex, 0, draggedTask);
      // newListsArray[draggedOverTaskWhichList].isListDraggedOver = false;
      draggedTask.isTaskDragged = false;
      draggedOverTask.isTaskDraggedOver = false;
      newListsArray[draggedOverTaskWhichList].isListDraggedOver = false;
      const classIndexToToggle = draggedOverTask.taskClasses.findIndex(el => el === 'draggedOverItem');
      draggedOverTask.taskClasses.splice(classIndexToToggle, 1);
      this.setState({
        lists: newListsArray
      });
    }
  }