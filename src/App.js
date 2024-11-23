import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
import { useTranslation } from 'react-i18next';

import Book from './pages/Book/Book';
import Collection from './pages/Collection/Collection';
import { COLOR_BG_NAVBAR, COLOR_MAIN, CONSENT_COOKIE_NAME } from './constants';
import Home from './pages/Home/Home';
import { initGA } from './analytics';
import Likes from './pages/Likes/Likes';
import Page from './Page';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Randomizer from './pages/Randomizer/Randomizer';
import ScrollToTop from './ScrollToTop';
import Series from './pages/Series/Series';
import SetLang from './SetLang';
import setThemeStyle from './setThemeStyle';

function App() {
  const { t } = useTranslation();
  setThemeStyle();

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/book" exact element={<Page Module={Book} />} />
          <Route path="/collection" exact element={<Page Module={Collection} />} />
          <Route path="/likes" exact element={<Page Module={Likes} />} />
          <Route path="/randomizer" exact element={<Page Module={Randomizer} />} />
          <Route path="/series" exact element={<Page Module={Series} />} />
          <Route path="*" element={<Page Module={PageNotFound} />} />
        </Routes>
        <SetLang />
      </Router>

      <CookieConsent
        cookieName={CONSENT_COOKIE_NAME}
        location="bottom"
        buttonText={t('cookieConsentAccept')}
        declineButtonText={t('cookieConsentRefuse')}
        enableDeclineButton
        flipButtons
        style={{ background: COLOR_BG_NAVBAR, color: 'white', fontSize: '16px' }}
        buttonStyle={{ background: COLOR_MAIN, color: 'black', fontSize: '16px' }}
        declineButtonStyle={{ background: 'white', color: 'black', fontSize: '16px' }}
        onAccept={initGA}
      >
        {t('cookieConsentText')}
      </CookieConsent>
    </>
  );
}

export default App;
