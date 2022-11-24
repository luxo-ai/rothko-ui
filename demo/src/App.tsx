import { RothkoProvider } from '@rothko-ui/ui';
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import PaddedNavLayout from './components/Layout/PaddedNavLayout';
import Home from './pages/Home';
import Main from './pages/Main';

const App = () => {
  return (
    <BrowserRouter>
      <RothkoProvider>
        <PaddedNavLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Main />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PaddedNavLayout>
      </RothkoProvider>
    </BrowserRouter>
  );
};

export default App;
