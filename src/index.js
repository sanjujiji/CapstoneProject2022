import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import dataSlice from './common/dataSlice';
import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
import {store,persistor} from './common/Store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const store = configureStore({reducer: {dataSliceReducer : dataSlice.reducer} });
// const store = configureStore({
//   reducer: dataSlice,
// });
console.log("in App")
root.render(
  <Provider store = {store}>
  <PersistGate loading={null} persistor={persistor}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export {store};
