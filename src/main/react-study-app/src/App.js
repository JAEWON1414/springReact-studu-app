import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import MainPage from './MainPage';
import LoginPage from './LoginPage';
import SignUp from './SignUp';
import store from './store';
import { Provider} from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/"
            element={<MainPage />} />
          <Route path="/login"
            element={<LoginPage />} />
          <Route path="/SignUp"
            element={<SignUp />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
