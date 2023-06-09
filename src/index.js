import React from 'react';
import ReactDOM from 'react-dom/client';
import 'style/index.css';
import App from './App';
import axios from 'axios';

const token = localStorage.getItem('access_token');
// axios.defaults.baseURL = 'https://www.pre-onboarding-selection-task.shop';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
// axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = token
  ? `Bearer ${token}`
  : null;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
