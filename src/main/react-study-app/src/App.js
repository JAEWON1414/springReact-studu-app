import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import MainPage from './MainPage';
import LoginPage from './LoginPage';
import SignUp from './SignUp';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/"
        element={<MainPage/>}/>
        <Route path="/login"
        element={<LoginPage/>}/>
        <Route path="/SignUp"
        element={<SignUp/>}/>
      </Routes>
    </Router>
  );
}

export default App;
