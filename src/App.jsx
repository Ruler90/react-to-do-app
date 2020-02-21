import React from 'react';
import './scss/App.css';
import ToDoContextProvider from './contexts/ToDoContext';
import MainControls from './components/MainControls';
import ToDoLists from './components/ListsAndTasks';

const App = () => (
  <ToDoContextProvider>
    <main>
      <MainControls />
      <div className="mainContainer">
        <ToDoLists />
      </div>
    </main>
  </ToDoContextProvider>
);

export default App;
