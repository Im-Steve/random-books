import {
  getTheme,
  QUEBEC_THEME_NAME,
  HALLOWEEN_THEME_NAME,
  CHRISTMAS_THEME_NAME,
} from './getTheme';

export default function setThemeStyle() {
  const theme = getTheme();
  const root = document.documentElement;

  switch (theme) {
    case QUEBEC_THEME_NAME:
      root.style.setProperty('--color-second', 'var(--blue-qc)');
      root.style.setProperty('--color-second-light', 'var(--blue-qc-light)');
      break;
    case HALLOWEEN_THEME_NAME:
      root.style.setProperty('--color-main', 'var(--orange)'); /* also present in constants.js */
      root.style.setProperty('--color-main-dark', 'var(--orange-dark)');
      root.style.setProperty('--color-main-light', 'var(--orange-light)');
      root.style.setProperty('--color-second', 'var(--gray)');
      root.style.setProperty('--color-second-light', 'var(--gray-light)');
      break;
    case CHRISTMAS_THEME_NAME:
      root.style.setProperty('--color-second', 'var(--red-noel)');
      root.style.setProperty('--color-second-light', 'var(--red-noel-light)');
      break;
    default:
      break;
  }

  return null;
}
