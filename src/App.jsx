import React from 'react';
import './scss/App.css';
import ToDoContextProvider from './contexts/ToDoContext';
import MainControls from './components/main-controls/MainControls';
import ToDoLists from './components/to-do-lists/ToDoLists';

const App = () => (
  <ToDoContextProvider>
    <main>
      <nav>
        <MainControls />
      </nav>

      <div className="lists__container">
        <ToDoLists />
      </div>
    </main>
  </ToDoContextProvider>
);

export default App;
