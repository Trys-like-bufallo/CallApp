import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './Redux/Store.js';
import {Provider} from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
<<<<<<< HEAD
    <Provider store={store}>
=======
    <Provider store = {store}>
>>>>>>> 90907537e7d154961b0942b3b91ea5b59714d0a4
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
