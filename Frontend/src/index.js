import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Ensure App.js exists in the same directory
import './styles.css'; // Import global styles

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Ensure your `index.html` has an element with id="root"
);
