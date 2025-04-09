import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LayoutContainer from './Layout/LayoutContainer';
import HomeContainer from './Pages/Home/HomeContainer';
import LoginContainer from './Pages/Login/LoginContainer';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/" element={<LayoutContainer />}>
        <Route index element={<HomeContainer />} />
      </Route>
    </Routes>
  );
};

export default App;
