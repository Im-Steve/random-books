import Cookies from 'js-cookie';
import { getCookieConsentValue } from 'react-cookie-consent';
import ReactGA from 'react-ga4';

import { CONSENT_COOKIE_NAME } from './constants';

export function hasCookieConsent() {
  return getCookieConsentValue(CONSENT_COOKIE_NAME) === 'true';
}

export function hasDeclinedCookieConsent() {
  return getCookieConsentValue(CONSENT_COOKIE_NAME) === 'false';
}

export function sendPageViewGA() {
  if (hasCookieConsent()) {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
  }
}

export function sendEventGA(event) {
  if (hasCookieConsent()) {
    ReactGA.event({
      category: event.category,
      action: event.action,
      label: event.label,
    });
  }
}

export function initGA() {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
  sendPageViewGA();
}

export function createConsentCookie() {
  Cookies.set(CONSENT_COOKIE_NAME, 'true', {
    sameSite: 'Lax',
    secure: process.env.NODE_ENV !== 'development',
  });
  initGA();
}

export function deleteAllCookies() {
  const cookies = document.cookie.split('; ');

  const domains = [
    window.location.hostname,
    // eslint-disable-next-line
    '.' + window.location.hostname,
    'www.bookyverse.com',
    '.bookyverse.com',
  ];
  const paths = ['/', '/auth', '/user'];

  cookies.forEach((cookie) => {
    const [cookieName] = cookie.split('=');

    domains.forEach((domain) => {
      paths.forEach((path) => {
        Cookies.remove(cookieName, { path, domain });
      });
    });

    Cookies.remove(cookieName);
  });
}
