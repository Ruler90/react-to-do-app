import React, { Component } from 'react';
import './scss/App.css';
import MainControls from './Components/MainControls';
import ToDoLists from './Components/ToDoLists';

export default class App extends Component {

  state = {
    lists: [
      {listId: 1, listName: '02.12.2019 (pon)', tasks: [
        { taskId: 1, taskContent: 'jakieś zadanie', isPrio: true, isInProgress: false },
        { taskId: 2, taskContent: 'kolejne zadanie', isPrio: false, isInProgress: false },
        { taskId: 3, taskContent: 'jeszcze jedno zadanie', isPrio: false, isInProgress: false }
      ]},
      {listId: 2, listName: '03.12.2019 (wt)', tasks: [
        { taskId: 1, taskContent: 'inne zadanie', isPrio: true, isInProgress: false },
        { taskId: 2, taskContent: 'następne zadanie', isPrio: false, isInProgress: false },
        { taskId: 3, taskContent: 'inne trzecie zadanie', isPrio: false, isInProgress: false }
      ]}
    ]
  }

  addList = () => {
    
  }

  deleteList = () => {

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
