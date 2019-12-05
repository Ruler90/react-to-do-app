import React, { Component} from 'react';
import './scss/App.css';
import MainControls from './Components/MainControls'

export default class App extends Component{
  render(){
    return(
      <div className="App">
        <MainControls />
      </div>
    );
  }
}
