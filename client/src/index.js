import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './Redux/Store.js';
import {Provider} from 'react-redux';
import socket from './Socket.js';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App socket = {socket}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
