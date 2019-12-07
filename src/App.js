import React, { Component } from 'react';
import './scss/App.css';
import MainControls from './Components/MainControls';
import ToDoLists from './Components/ToDoLists';

export default class App extends Component {

  state = {
    lists: [
      {listId: 1, listName: '2019-12-02 (pon)', tasks: [
        { taskId: 1, taskContent: 'jakieś zadanie', isPrio: false, isInProgress: false, isDragged: false },
        { taskId: 2, taskContent: 'kolejne zadanie', isPrio: false, isInProgress: true, isDragged: false },
        { taskId: 3, taskContent: 'jeszcze jedno zadanie', isPrio: false, isInProgress: false, isDragged: false }
      ]},
      {listId: 2, listName: '2019-12-03 (wt)', tasks: [
        { taskId: 1, taskContent: 'inne zadanie', isPrio: true, isInProgress: false, isDragged: false },
        { taskId: 2, taskContent: 'następne zadanie', isPrio: true, isInProgress: true, isDragged: false },
        { taskId: 3, taskContent: 'inne trzecie zadanie', isPrio: false, isInProgress: true, isDragged: false }
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

  render () {
    return (
      <div className="App">
        <main>
          <MainControls addList={this.addList}/>
          <div className="mainContainer">
            <ToDoLists lists={this.state.lists} deleteList={this.deleteList} />
          </div>
        </main>
      </div>
    );
  }
}
