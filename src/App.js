import React, { Component } from 'react';
import './scss/App.css';
import MainControls from './Components/MainControls';
import ToDoLists from './Components/ToDoListsFull';

export default class App extends Component {

  state = {
    lists: [
      {listId: 1, listName: '2019-12-02 (pon)', listClasses: ['ToDoList__nameBar'], tasks: [
        { taskId: 132352, taskContent: 'jakieś zadanie', taskClasses: ['taskItem'], isDragged: false },
        { taskId: 256573, taskContent: 'kolejne zadanie', taskClasses: ['taskItem'], isDragged: false },
        { taskId: 323278, taskContent: 'jeszcze jedno zadanie', taskClasses: ['taskItem'], isDragged: false }
      ]},
      {listId: 2, listName: '2019-12-03 (wt)', listClasses: ['ToDoList__nameBar'], tasks: [
        { taskId: 178992, taskContent: 'inne zadanie', taskClasses: ['taskItem'], isDragged: false },
        { taskId: 257321, taskContent: 'następne zadanie', taskClasses: ['taskItem'], isDragged: false },
        { taskId: 309345, taskContent: 'inne trzecie zadanie', taskClasses: ['taskItem'], isDragged: false }
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
    const whichList = newListsArray.findIndex(element => element === list);
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
      const whichList = newListsArray.findIndex(element => element === list);
      newListsArray[whichList].listName = event.target.value;
      if (newListsArray[whichList].listClasses.find(element => element === 'spanEdit')) {
        const classIndexToRemove = newListsArray[whichList].listClasses.findIndex(element => element === 'spanEdit');
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
      isDragged: false
    };
    const newListsArray = this.state.lists.slice();
    const whichList = newListsArray.findIndex(element => element === list);
    newListsArray[whichList].tasks.push(newTask);
    this.setState({
      lists: newListsArray
    });
    setTimeout(() => document.querySelector('.spanEdit input[type=text]').focus(), 50);
  }

  deleteTask = (task) => {
    const newListsArray = this.state.lists.slice();
    for (let list of newListsArray) {
      if (list.tasks.find(element => element === task)) {
        const whichTask = list.tasks.findIndex(element => element === task);
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
      if (list.tasks.find(element => element === task)) {
        const whichTask = list.tasks.findIndex(element => element === task);
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
        if (list.tasks.find(element => element === task)) {
          const whichTask = list.tasks.findIndex(element => element === task);
          list.tasks[whichTask].taskContent = event.target.value;
          if (list.tasks[whichTask].taskClasses.find(element => element === 'spanEdit')) {
            const classIndexToRemove = list.tasks[whichTask].taskClasses.findIndex(element => element === 'spanEdit');
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
      if (list.tasks.find(element => element === task)) {
        const whichTask = list.tasks.findIndex(element => element === task);
        if (!list.tasks[whichTask].taskClasses.find(element => element === 'prioTask')) {
          list.tasks[whichTask].taskClasses.push('prioTask');
        } else {
          const classIndexToToggle = list.tasks[whichTask].taskClasses.findIndex(element => element === 'prioTask');
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
      if (list.tasks.find(element => element === task)) {
        const whichTask = list.tasks.findIndex(element => element === task);
        if (!list.tasks[whichTask].taskClasses.find(element => element === 'taskInProgress')) {
          list.tasks[whichTask].taskClasses.push('taskInProgress');
        } else {
          const classIndexToToggle = list.tasks[whichTask].taskClasses.findIndex(element => element === 'taskInProgress');
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

  render () {
    return (
      <div className="App">
        <main>
          <MainControls addList={this.addList} tasksBackup={this.tasksBackup} loadFromFile={this.loadFromFile}/>
          <div className="mainContainer">
            <ToDoLists lists={this.state.lists} deleteList={this.deleteList} listNameShowInput={this.listNameShowInput} listNameEdit={this.listNameEdit} addTask={this.addTask} deleteTask={this.deleteTask} taskContentShowInput={this.taskContentShowInput} taskContentEdit={this.taskContentEdit} prioTask={this.prioTask} taskInProgress={this.taskInProgress}/>
          </div>
        </main>
      </div>
    );
  }
}
