import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './Redux/Store.js';
import {Provider} from 'react-redux';
import socket from './Socket.js';
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link
} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <Router>
        <Routes>
          <Route path = "/" exact element = {<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
