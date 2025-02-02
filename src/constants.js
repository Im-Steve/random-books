import {
  getTheme,
  HALLOWEEN_THEME_NAME,
} from './getTheme';

let mainColor = '#ffd700'; // gold // also present in index.css
const theme = getTheme();
// also present in index.css & setThemeStyle.js
switch (theme) {
  case HALLOWEEN_THEME_NAME:
    mainColor = '#ffa500'; // orange
    break;
  default:
    break;
}

export const EASTER_EGG = 'Ne lisez pas ceci. Sérieusement, continuez votre chemin.';
export const COLOR_BG_NAVBAR = '#2b2a33'; // also present in index.css
export const COLOR_MAIN = mainColor;
export const CONSENT_COOKIE_NAME = 'cookieConsent';
export const FAKE_LOADING_TIME = '500'; // in milliseconds
export const FAKE_SAFARI_TIME = '1000'; // in milliseconds
export const FEATURED_CATEGORIES = ['En vedette', 'en vedette', 'en-vedette', 'Featured', 'featured'];
export const NAVBAR_HEIGHT = 60; // in pixels // also present in index.css
export const PROMOTIONAL_CATEGORIES = ['Livres en autopromotion', 'livres en autopromotion', 'livres-en-autopromotion', 'En vedette', 'en vedette', 'en-vedette', 'Featured', 'featured'];
export const SWITCH_HEIGHT = 28;
export const SWITCH_HANDLEDIAMETER = 23;
export const TIGER_EMAIL = 'allo.un.simple.tigre@gmail.com';
export const TIGER_LINK = 'https://linktr.ee/un_simple_tigre';
