import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
//두번 렌더링돼서 StrictMode 제거 
// <React.StrictMode>
// {/* <App/> */ }
// {/* </React.StrictMode> */}