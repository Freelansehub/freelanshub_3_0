import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LayoutContainer from './Layout/LayoutContainer';
import HomeContainer from './Pages/Home/HomeContainer';
import AuthLayout from './Pages/Auth/AuthLayout';
import LoginContainer from './Pages/Auth/Login/LoginContainer';
import Register from './Pages/Auth/Register/Register';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />} > 
        <Route path="login"  element={<LoginContainer />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="/" element={<LayoutContainer />}>
        <Route index element={<HomeContainer />} />
      </Route>
    </Routes>
  );
};

export default App;
