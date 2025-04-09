import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LayoutContainer from './Layout/LayoutContainer';
import HomeContainer from './Pages/Home/HomeContainer';
import LoginContainer from './Pages/Login/LoginContainer';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/" element={<LayoutContainer />}>
      <Route path='/kabinet-client' element={<HomeContainer />} />
        <Route index element={<HomeContainer />} />
      </Route>
    </Routes>
  );
};

export default App;
