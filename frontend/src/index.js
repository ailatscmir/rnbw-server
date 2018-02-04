import registerServiceWorker from './registerServiceWorker';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import configureStore from "./store/index";


import './index.css';
import App from './App';

function logger (){
  console.log(JSON.stringify(store.getState()));
}

const store = configureStore();
store.subscribe(logger);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
