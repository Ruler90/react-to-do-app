import React, { Component } from 'react';
import './scss/App.css';
import MainControls from './Components/MainControls';
import ToDoLists from './Components/ToDoListsFull';

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

  // Drag and drop for lists

  listDragStartHandler = (listId, event) => {
    if (event.target.classList.contains('ToDoList__container')) {
      const newListsArray = this.state.lists.slice();
      for (let item of newListsArray) {
        if (item.listId === listId) {
          item.isListDragged = true;
          this.setState({
            lists: newListsArray
          });
        }
      }
    }
  }
  
  listDragEndHandler = (list) => {
    const newListsArray = this.state.lists.slice();
    for (let item of newListsArray) {
      if (item === list) {
        item.isListDraggedOver = false;
        this.setState({
          lists: newListsArray
        });
      }
    }
  }
  
  listDragOverHandler = (event, list) => {
    event.preventDefault();
    const newListsArray = this.state.lists.slice();
    for (let item of newListsArray) {
      if (item === list) {
        item.isListDraggedOver = true;
        // this.setState({
        //   lists: newListsArray
        // });
      }
    }
  }

  listDragLeaveHandler = (list) => {
    const newListsArray = this.state.lists.slice();
    for (let item of newListsArray) {
      if (item === list) {
        item.isListDraggedOver = false;
        this.setState({
          lists: newListsArray
        });
      }
    }
  }
  
  listDropHandler = () => {
    const newListsArray = this.state.lists.slice();
    let draggedTaskWhichList, draggedTaskIndex, draggedTask, draggedOverTaskWhichList;
    for (let [index, list] of newListsArray.entries()) {

      if (list.tasks.find(el => el.isTaskDragged)) {
        draggedTaskWhichList = index;
        draggedTaskIndex = list.tasks.findIndex(el => el.isTaskDragged);
        draggedTask = list.tasks.find(el => el.isTaskDragged);
      }
    }
  }

  // Drag and drop for tasks

  taskDragStartHandler = (task) => {
    const newListsArray = this.state.lists.slice();
    for (let list of newListsArray) {
      if (list.tasks.find(el => el === task)) {
        const whichTask = list.tasks.findIndex(el => el === task);
        list.tasks[whichTask].isTaskDragged = true;
        this.setState({
          lists: newListsArray
        });
      }
    }
  }

  taskDragEndHandler = (task) => {
    const newListsArray = this.state.lists.slice();
    for (let list of newListsArray) {
      if (list.tasks.find(el => el === task)) {
        const whichTask = list.tasks.findIndex(el => el === task);
        if (list.tasks[whichTask].isTaskDragged) {
          list.tasks[whichTask].isTaskDragged = false;
          list.tasks[whichTask].isTaskDraggedOver = false;
          const classIndexToToggle = list.tasks[whichTask].taskClasses.findIndex(el => el === 'draggedOverItem');
          list.tasks[whichTask].taskClasses.splice(classIndexToToggle, 1);
          this.setState({
            lists: newListsArray
          });
        }
      }
    }
  }

  taskDragOverHandler = (event, task) => {
    event.preventDefault();
    const newListsArray = this.state.lists.slice();
    for (let item of newListsArray) {
      if (item.tasks.find(el => el === task)) {
        const whichTask = item.tasks.findIndex(el => el === task);
        if (!item.tasks[whichTask].taskClasses.find(el => el === 'draggedOverItem')) {
          item.tasks[whichTask].taskClasses.push('draggedOverItem');
          item.tasks[whichTask].isTaskDraggedOver = true;
          this.setState({
            lists: newListsArray
          });
        }
      }
    }
  }

  taskDragLeaveHandler = (task) => {
    const newListsArray = this.state.lists.slice();
    for (let item of newListsArray) {
      if (item.tasks.find(el => el === task)) {
        const whichTask = item.tasks.findIndex(el => el === task);
        if (item.tasks[whichTask].taskClasses.find(el => el === 'draggedOverItem')) {
          const classIndexToToggle = item.tasks[whichTask].taskClasses.findIndex(el => el === 'draggedOverItem');
          item.tasks[whichTask].taskClasses.splice(classIndexToToggle, 1);
          item.tasks[whichTask].isTaskDraggedOver = false;
          this.setState({
            lists: newListsArray
          });
        }
      }
    }
  }

  taskDropHandler = () => {
    const newListsArray = this.state.lists.slice();
    let draggedTaskWhichList, draggedTaskIndex, draggedTask, draggedOverTaskWhichList, draggedOverTaskIndex, draggedOverTask;
    for (let [index, list] of newListsArray.entries()) {

      if (list.tasks.find(el => el.isTaskDragged)) {
        draggedTaskWhichList = index;
        draggedTaskIndex = list.tasks.findIndex(el => el.isTaskDragged);
        draggedTask = list.tasks.find(el => el.isTaskDragged);
      }

      if (list.tasks.find(el => el.isTaskDraggedOver)) {
        draggedOverTaskWhichList = index;
        draggedOverTaskIndex = list.tasks.findIndex(el => el.isTaskDraggedOver);
        draggedOverTask = list.tasks.find(el => el.isTaskDraggedOver);
      }
    }

    if (draggedTaskWhichList !== draggedOverTaskWhichList || draggedTaskWhichList === draggedOverTaskWhichList && draggedTaskIndex !== draggedOverTaskIndex) {
      newListsArray[draggedTaskWhichList].tasks.splice(draggedTaskIndex, 1);
      newListsArray[draggedOverTaskWhichList].tasks.splice(draggedOverTaskIndex, 0, draggedTask);
      newListsArray[draggedOverTaskWhichList].isListDraggedOver = false;
      draggedTask.isTaskDragged = false;
      draggedOverTask.isTaskDraggedOver = false;
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
            
              listDragStartHandler={this.listDragStartHandler} listDragEndHandler={this.listDragEndHandler} listDragOverHandler={this.listDragOverHandler} listDragLeaveHandler={this.listDragLeaveHandler} listDropHandler={this.listDropHandler} 
            
              taskDragStartHandler={this.taskDragStartHandler} taskDragEndHandler={this.taskDragEndHandler} taskDragOverHandler={this.taskDragOverHandler} taskDragEnterHandler={this.taskDragEnterHandler} taskDragLeaveHandler={this.taskDragLeaveHandler} taskDropHandler={this.taskDropHandler}/>

          </div>
        </main>
      </div>
    );
  }
}
