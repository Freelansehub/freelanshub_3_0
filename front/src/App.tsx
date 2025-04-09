import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LayoutContainer from './Layout/LayoutContainer';
import HomeContainer from './Pages/Home/HomeContainer';
import LoginContainer from './Pages/Login/LoginContainer';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import KabinetClient from './Pages/KabinetClient/KabinetClient';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/" element={<LayoutContainer />}>
      <Route path='/kabinet-client' element={<KabinetClient />} />
        <Route index element={<HomeContainer />} />
      </Route>
    </Routes>
  );
};

export default App;
