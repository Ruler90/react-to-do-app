import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { dragScroll } from './dragScroll.js';

(function loadTodos() {
  if (!localStorage.getItem('myReactTasks')) {
    localStorage.setItem('myReactTasks', '[]');
  }
})();

ReactDOM.render(<App />, document.getElementById('root'));

window.onload = function () {
  dragScroll();
};
