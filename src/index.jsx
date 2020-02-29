import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { dragScroll } from './components/dragScroll';

ReactDOM.render(<App />, document.getElementById('root'));

window.onload = function () {
  dragScroll();
};
