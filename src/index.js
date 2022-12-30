import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import  './index.css';
import reducer, { intialState } from './Reducer';
import { StateProvider } from './StateProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StateProvider intialState={intialState} reducer={reducer}>
     <App />
  </StateProvider>
);

