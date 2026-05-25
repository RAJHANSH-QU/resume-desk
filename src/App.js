import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Builder from './pages/Builder';
import '@fontsource/playfair-display';
import '@fontsource/inter';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </HashRouter>
  );
}

export default App;