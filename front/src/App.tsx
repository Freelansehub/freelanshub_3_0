import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LayoutContainer from './Layout/LayoutContainer';
import HomeContainer from './Pages/Home/HomeContainer';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutContainer />}>
        <Route index element={<HomeContainer />} />
      </Route>
    </Routes>
  );
};

export default App;
