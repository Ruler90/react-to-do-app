import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { dragScroll } from './components/other-features/dragScroll';

ReactDOM.render(<App />, document.getElementById('root'));

window.onload = () => {
  dragScroll();
};
