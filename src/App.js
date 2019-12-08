import React, { Component } from 'react';
import './scss/App.css';
import MainControls from './Components/MainControls';
import ToDoLists from './Components/ToDoListsFull';

export default class App extends Component {

  state = {
    lists: [
      {listId: 1, listName: '2019-12-02 (pon)', listClasses: ['ToDoList__nameBar'], tasks: [
        { taskId: 1, taskContent: 'jakieś zadanie', taskClasses: ['taskItem'], isDragged: false },
        { taskId: 2, taskContent: 'kolejne zadanie', taskClasses: ['taskItem'], isDragged: false },
        { taskId: 3, taskContent: 'jeszcze jedno zadanie', taskClasses: ['taskItem'], isDragged: false }
      ]},
      {listId: 2, listName: '2019-12-03 (wt)', listClasses: ['ToDoList__nameBar'], tasks: [
        { taskId: 1, taskContent: 'inne zadanie', taskClasses: ['taskItem'], isDragged: false },
        { taskId: 2, taskContent: 'następne zadanie', taskClasses: ['taskItem'], isDragged: false },
        { taskId: 3, taskContent: 'inne trzecie zadanie', taskClasses: ['taskItem'], isDragged: false }
      ]}
    ]
  }

  addList = () => {
    const dateInput = document.querySelector('#chooseDate').value;
    const dayName = ['nd', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob'];
    if (dateInput !== '' && dateInput !== undefined) {
      const realDate = new Date(dateInput);
      const list = {
        listId: new Date().getTime(),
        listName: dateInput + ' (' + dayName[realDate.getDay()] + ')',
        tasks: []
      };
      let newListsArray = [...this.state.lists, list];
      this.setState({
        lists: newListsArray
      });
    }
  }

  deleteList = (listId) => {
    if (confirm('Usnąć cały dzień?')) {
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

  // tutaj też raczej działam na istniejącym arrayu niż zmieniam nowy
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

  render () {
    return (
      <div className="App">
        <main>
          <MainControls addList={this.addList}/>
          <div className="mainContainer">
            <ToDoLists lists={this.state.lists} deleteList={this.deleteList} listNameShowInput={this.listNameShowInput} listNameEdit={this.listNameEdit} taskContentShowInput={this.taskContentShowInput} taskContentEdit={this.taskContentEdit} />
          </div>
        </main>
      </div>
    );
  }
}
