import registerServiceWorker from './registerServiceWorker';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import configureStore from "./store/index";

import './index.css';
import App from './App';



const store = configureStore();

function conoutput(){
  console.log(store.getState());
}
store.subscribe(conoutput);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
