import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Book from './pages/Book/Book';
import Home from './pages/Home/Home';
import i18n from './i18n/i18n';
import Page from './Page';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Randomizer from './pages/Randomizer/Randomizer';

function App() {
  i18n.changeLanguage('fr');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/randomizer" element={<Page Module={Randomizer} />} />
        <Route path="/book/:category/:isbn" element={<Page Module={Book} />} />
        <Route path="*" element={<Page Module={PageNotFound} />} />
      </Routes>
    </Router>
  );
}

export default App;
