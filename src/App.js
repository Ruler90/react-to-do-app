import React, { Component } from 'react';
import './scss/App.css';
import MainControls from './Components/MainControls';
import ToDoLists from './Components/ToDoListsFull';
import { click } from './dragScroll.js';

export default class App extends Component {

  state = {
    lists: [
      {listId: 1, listName: '2019-12-02 (pon)', listClasses: ['ToDoList__nameBar'], isListDragged: false, isListDraggedOver: false, tasks: [
        { taskId: 132352, taskContent: 'jakieś zadanie', taskClasses: ['taskItem'], isTaskDragged: false, isTaskDraggedOver: false },
        { taskId: 256573, taskContent: 'kolejne zadanie', taskClasses: ['taskItem'], isTaskDragged: false, isTaskDraggedOver: false },
        { taskId: 323278, taskContent: 'jeszcze jedno zadanie', taskClasses: ['taskItem'], isTaskDragged: false, isTaskDraggedOver: false }
      ]},
      {listId: 2, listName: '2019-12-03 (wt)', listClasses: ['ToDoList__nameBar'], isListDragged: false, isListDraggedOver: false, tasks: [
        { taskId: 178992, taskContent: 'inne zadanie', taskClasses: ['taskItem'], isTaskDragged: false, isTaskDraggedOver: false },
        { taskId: 257321, taskContent: 'następne zadanie', taskClasses: ['taskItem'], isTaskDragged: false, isTaskDraggedOver: false },
        { taskId: 309345, taskContent: 'inne trzecie zadanie', taskClasses: ['taskItem'], isTaskDragged: false, isTaskDraggedOver: false }
      ]}
    ]
  }

  // Lists functions

  addList = () => {
    const dateInput = document.querySelector('#chooseDate').value;
    const dayName = ['nd', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob'];
    if (dateInput !== '' && dateInput !== undefined) {
      const realDate = new Date(dateInput);
      const list = {
        listId: new Date().getTime(),
        listName: dateInput + ' (' + dayName[realDate.getDay()] + ')',
        listClasses: ['ToDoList__nameBar'],
        isListDragged: false,
        isListDraggedOver: false,
        tasks: []
      };
      let newListsArray = [...this.state.lists, list];
      this.setState({
        lists: newListsArray
      });
    }
  }

  deleteList = (listId) => {
    if (confirm('Usunąć cały dzień?')) {
      const newListsArray = this.state.lists.filter(item => {
        return (
          item.listId !== listId
        );
      });
      this.setState({
        lists: newListsArray
      });
    }
  }

  listNameShowInput = (list, event) => {
    const newListsArray = this.state.lists.slice();
    const whichList = newListsArray.findIndex(el => el === list);
    newListsArray[whichList].listClasses.push('spanEdit');
    event.target.nextSibling.value = list.listName;
    setTimeout(() => event.target.nextSibling.focus(), 50);
    this.setState({
      lists: newListsArray
    });
  }

  listNameEdit = (list, event) => {
    if (event.type === 'blur' || event.key === 'Enter') {
      const newListsArray = this.state.lists.slice();
      const whichList = newListsArray.findIndex(el => el === list);
      newListsArray[whichList].listName = event.target.value;
      if (newListsArray[whichList].listClasses.find(el => el === 'spanEdit')) {
        const classIndexToRemove = newListsArray[whichList].listClasses.findIndex(el => el === 'spanEdit');
        newListsArray[whichList].listClasses.splice(classIndexToRemove, 1);
      }
      this.setState({
        lists: newListsArray
      });
    }
  }

  // Tasks functions

  addTask = (list) => {
    const newTask = {
      taskId: new Date().getTime(),
      taskContent: '',
      taskClasses: ['taskItem', 'spanEdit'],
      isTaskDragged: false,
      isTaskDraggedOver: false
    };
    const newListsArray = this.state.lists.slice();
    const whichList = newListsArray.findIndex(el => el === list);
    newListsArray[whichList].tasks.push(newTask);
    this.setState({
      lists: newListsArray
    });
    setTimeout(() => document.querySelector('.spanEdit input[type=text]').focus(), 50);
  }

  deleteTask = (task) => {
    const newListsArray = this.state.lists.slice();
    for (let list of newListsArray) {
      if (list.tasks.find(el => el === task)) {
        const whichTask = list.tasks.findIndex(el => el === task);
        list.tasks.splice(whichTask, 1);
        this.setState({
          lists: newListsArray
        });
      }
    }
  }

  taskContentShowInput = (task, event) => {
    const newListsArray = this.state.lists.slice();
    for (let list of newListsArray) {
      if (list.tasks.find(el => el === task)) {
        const whichTask = list.tasks.findIndex(el => el === task);
        list.tasks[whichTask].taskClasses.push('spanEdit');
        event.target.nextSibling.value = task.taskContent;
        setTimeout(() => event.target.nextSibling.focus(), 50);
        this.setState({
          lists: newListsArray
        });
      }
    }
  }

  taskContentEdit = (task, event) => {
    if (event.type === 'blur' || event.key === 'Enter') {
      const newListsArray = this.state.lists.slice();
      for (let list of newListsArray) {
        if (list.tasks.find(el => el === task)) {
          const whichTask = list.tasks.findIndex(el => el === task);
          list.tasks[whichTask].taskContent = event.target.value;
          if (list.tasks[whichTask].taskClasses.find(el => el === 'spanEdit')) {
            const classIndexToRemove = list.tasks[whichTask].taskClasses.findIndex(el => el === 'spanEdit');
            list.tasks[whichTask].taskClasses.splice(classIndexToRemove, 1);
          }
          this.setState({
            lists: newListsArray
          });
        }
      }
    }
  }

  prioTask = (task) => {
    const newListsArray = this.state.lists.slice();
    for (let list of newListsArray) {
      if (list.tasks.find(el => el === task)) {
        const whichTask = list.tasks.findIndex(el => el === task);
        if (!list.tasks[whichTask].taskClasses.find(el => el === 'prioTask')) {
          list.tasks[whichTask].taskClasses.push('prioTask');
        } else {
          const classIndexToToggle = list.tasks[whichTask].taskClasses.findIndex(el => el === 'prioTask');
          list.tasks[whichTask].taskClasses.splice(classIndexToToggle, 1);
        }
        this.setState({
          lists: newListsArray
        });
      }
    }
  }

  taskInProgress = (task) => {
    const newListsArray = this.state.lists.slice();
    for (let list of newListsArray) {
      if (list.tasks.find(el => el === task)) {
        const whichTask = list.tasks.findIndex(el => el === task);
        if (!list.tasks[whichTask].taskClasses.find(el => el === 'taskInProgress')) {
          list.tasks[whichTask].taskClasses.push('taskInProgress');
        } else {
          const classIndexToToggle = list.tasks[whichTask].taskClasses.findIndex(el => el === 'taskInProgress');
          list.tasks[whichTask].taskClasses.splice(classIndexToToggle, 1);
        }
        this.setState({
          lists: newListsArray
        });
      }
    }
  }

  // Other functions

  tasksBackup = () => {
    const myTaskLists = JSON.stringify(this.state.lists);
    const blob = new Blob([myTaskLists], { type: 'application/json;charset=utf-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'tasksBackup.json';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
    document.body.removeChild(downloadLink);
  }

  loadFromFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = () => {
      this.setState({
        lists: JSON.parse(reader.result)
      });
      // 2 lines below are needed to clear file from input in case you want to load the same file again without page reload
      const loadFromFileBtn = document.querySelector('#fileInput');
      loadFromFileBtn.value = '';
    };
    reader.onerror = function () {
      alert('Nie udało się wczytać pliku');
    };
  }

  // Drag event handlers for lists

  listDragStartHandler = (listId, event) => {
    if (event.target.classList.contains('ToDoList__container')) {
      click.mousedown = false;
      const newListsArray = this.state.lists.slice();
      for (let list of newListsArray) {
        if (list.listId === listId) {
          list.isListDragged = true;
          this.setState({
            lists: newListsArray
          });
        }
      }
    }
  }
  
  listDragEndHandler = () => {
    const newListsArray = this.state.lists.slice();
    for (let list of newListsArray) {
      if (list.isListDragged) {
        list.isListDragged = false;
      }
      if (list.isListDraggedOver) {
        list.isListDraggedOver = false;
      }
      const tasks = list.tasks;
      for (let item of tasks) {
        if (item.isTaskDraggedOver) {
          item.isTaskDraggedOver = false;
        }
        //used only when dragged task and dropped it on itself
        if (item.taskClasses.find(el => el === 'draggedOverItem')) {
          const classIndexToToggle = item.taskClasses.findIndex(el => el === 'draggedOverItem');
          item.taskClasses.splice(classIndexToToggle, 1);
        }
      }
    }
    this.setState({
      lists: newListsArray
    });
  }
  
  listDragOverHandler = (event, listId) => {
    event.preventDefault();
    const newListsArray = this.state.lists.slice();
    for (let list of newListsArray) {
      if (list.listId === listId) {
        list.isListDraggedOver = true;
      }
    }
  }

  listDragLeaveHandler = (listId) => {
    const newListsArray = this.state.lists.slice();
    for (let item of newListsArray) {
      if (item.listId === listId) {
        item.isListDraggedOver = false;
        this.setState({
          lists: newListsArray
        });
      }
    }
  }
  
  // Drag event handlers for tasks

  taskDragStartHandler = (listId, taskId) => {
    click.mousedown = false;
    const newListsArray = this.state.lists.slice();
    for (let list of newListsArray) {
      if (list.listId === listId) {
        const whichTask = list.tasks.findIndex(el => el.taskId === taskId);
        list.tasks[whichTask].isTaskDragged = true;
      }
    }
    this.setState({
      lists: newListsArray
    });
  }

  taskDragEndHandler = () => {
    const newListsArray = this.state.lists.slice();
    for (let list of newListsArray) {
      if (list.isListDraggedOver) {
        list.isListDraggedOver = false;
      }
      const tasks = list.tasks;
      for (let item of tasks) {
        if (item.isTaskDragged) {
          item.isTaskDragged = false;
        }
        if (item.isTaskDraggedOver) {
          item.isTaskDraggedOver = false;
        }
        //used only when dragged task and dropped it on itself
        if (item.taskClasses.find(el => el === 'draggedOverItem')) {
          const classIndexToToggle = item.taskClasses.findIndex(el => el === 'draggedOverItem');
          item.taskClasses.splice(classIndexToToggle, 1);
        }
      }
    }
    this.setState({
      lists: newListsArray
    });
  }

  taskDragOverHandler = (event, listId, taskId) => {
    event.preventDefault();
    const newListsArray = this.state.lists.slice();
    for (let list of newListsArray) {
      if (list.listId === listId) {
        const whichTask = list.tasks.findIndex(el => el.taskId === taskId);
        if (!list.tasks[whichTask].taskClasses.find(el => el === 'draggedOverItem')) {
          list.tasks[whichTask].taskClasses.push('draggedOverItem');
          list.tasks[whichTask].isTaskDraggedOver = true;
          this.setState({
            lists: newListsArray
          });
        }
      }
    }
  }

  taskDragLeaveHandler = (listId, taskId) => {
    const newListsArray = this.state.lists.slice();
    for (let list of newListsArray) {
      if (list.listId === listId) {
        const whichTask = list.tasks.findIndex(el => el.taskId === taskId);
        if (list.tasks[whichTask].taskClasses.find(el => el === 'draggedOverItem')) {
          const classIndexToToggle = list.tasks[whichTask].taskClasses.findIndex(el => el === 'draggedOverItem');
          list.tasks[whichTask].taskClasses.splice(classIndexToToggle, 1);
          list.tasks[whichTask].isTaskDraggedOver = false;
          this.setState({
            lists: newListsArray
          });
        }
      }
    }
  }

  // drop event handler for lists and tasks

  dropHandler = () => {
    const newListsArray = this.state.lists.slice();
    let draggedTaskWhichList, draggedTaskIndex, draggedTaskId, draggedTask, draggedOverTaskWhichList, draggedOverTaskIndex, draggedOverTaskId, draggedOverTask, draggedList, draggedListIndex, draggedListId, draggedOverListIndex, draggedOverListId;
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

      if (list.isListDraggedOver) {
        draggedOverListIndex = index;
        draggedOverListId = list.listId;
      }

      if (list.isListDragged) {
        draggedListIndex = index;
        draggedListId = list.listId;
        draggedList = list;
      }
    }

    // drop list on other list or on task on other list 
    if (draggedTaskId === undefined && draggedListId !== undefined && draggedListId !== draggedOverListId ) {
      newListsArray.splice(draggedListIndex, 1);
      newListsArray.splice(draggedOverListIndex, 0, draggedList);
      newListsArray[draggedListIndex].isListDragged = false;
      newListsArray[draggedOverListIndex].isListDraggedOver = false;
      for (let list of newListsArray) {
        const tasks = list.tasks;
        for (let item of tasks) {
          if (item.isTaskDraggedOver) {
            item.isTaskDraggedOver = false;
          }
          //used only when dragged task and dropped it on itself
          if (item.taskClasses.find(el => el === 'draggedOverItem')) {
            const classIndexToToggle = item.taskClasses.findIndex(el => el === 'draggedOverItem');
            item.taskClasses.splice(classIndexToToggle, 1);
          }
        }
      }
      this.setState({
        lists: newListsArray
      });
    }

    // drop task on a list (no other task dragOver)
    if (draggedTaskId !== undefined && draggedOverTaskId === undefined && draggedListId === undefined && draggedOverListIndex !== undefined) {
      newListsArray[draggedTaskWhichList].tasks.splice(draggedTaskIndex, 1);
      newListsArray[draggedOverListIndex].tasks.push(draggedTask);
      newListsArray[draggedOverListIndex].isListDraggedOver = false;
      draggedTask.isTaskDragged = false;
      this.setState({
        lists: newListsArray
      });
    }

    // drop task on other task
    if (draggedTaskId !== undefined && draggedOverTaskId !== undefined && draggedTaskId !== draggedOverTaskId) {
      newListsArray[draggedTaskWhichList].tasks.splice(draggedTaskIndex, 1);
      newListsArray[draggedOverTaskWhichList].tasks.splice(draggedOverTaskIndex, 0, draggedTask);
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

  render () {
    return (
      <div className="App">
        <main>
          <MainControls addList={this.addList} tasksBackup={this.tasksBackup} loadFromFile={this.loadFromFile}/>
          <div className="mainContainer">
            
            <ToDoLists lists={this.state.lists} 
            
              deleteList={this.deleteList} listNameShowInput={this.listNameShowInput} listNameEdit={this.listNameEdit} 
            
              addTask={this.addTask} deleteTask={this.deleteTask} taskContentShowInput={this.taskContentShowInput} taskContentEdit={this.taskContentEdit} prioTask={this.prioTask} taskInProgress={this.taskInProgress} 
            
              listDragStartHandler={this.listDragStartHandler} listDragEndHandler={this.listDragEndHandler} listDragOverHandler={this.listDragOverHandler} listDragLeaveHandler={this.listDragLeaveHandler} 
            
              taskDragStartHandler={this.taskDragStartHandler} taskDragEndHandler={this.taskDragEndHandler} taskDragOverHandler={this.taskDragOverHandler} taskDragEnterHandler={this.taskDragEnterHandler} taskDragLeaveHandler={this.taskDragLeaveHandler} 
              
              dropHandler={this.dropHandler}/>

          </div>
        </main>
      </div>
    );
  }
}
