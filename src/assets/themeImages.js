import {
  QUEBEC_THEME_NAME,
  SUMMER_THEME_NAME,
  HALLOWEEN_THEME_NAME,
  CHRISTMAS_THEME_NAME,
} from '../getTheme';

const href = process.env.REACT_APP_IMAGE_FOLDER_URL;

export const normalImages = {
  bgSeriesLandscape: `${href}/bg-series-landscape.webp`,
  bgSeriesPortrait: `${href}/bg-series-portrait.webp`,
  bookSide: `${href}/book-side.webp`,
  bookWall: `${href}/book-wall.webp`,
  homeBgLandscape: `${href}/home-landscape.webp`,
  homeBgPortrait: `${href}/home-portrait.webp`,
  logoFacebook: `${href}/logo-facebook.webp`,
  logoInstagram: `${href}/logo-instagram.webp`,
  logoLinkedin: `${href}/logo-linkedin.webp`,
  logoLinktree: `${href}/logo-linktree.webp`,
  logoThreads: `${href}/logo-threads.webp`,
  logoTiktok: `${href}/logo-tiktok.webp`,
  logoWattpad: `${href}/logo-wattpad.webp`,
  logoWattpadFull: `${href}/logo-wattpad-full.webp`,
  logoWebsite: `${href}/logo.svg`,
  logoX: `${href}/logo-x.webp`,
  noCover: `${href}/no-cover.webp`,
  noResult: `${href}/no-result.webp`,
  pageNotFound: `${href}/404.webp`,
  searchButton: `${href}/search-button.webp`,
  tigerEgg: `${href}/tiger-egg.webp`,
  woodenShelf: `${href}/wooden-shelf.webp`,
};

export const quebecNationalDayImages = {
  ...normalImages,
  bookWall: `${href}/${QUEBEC_THEME_NAME}/book-wall.webp`,
  homeBgLandscape: `${href}/${QUEBEC_THEME_NAME}/home-landscape.webp`,
  homeBgPortrait: `${href}/${QUEBEC_THEME_NAME}/home-portrait.webp`,
  logoWebsite: `${href}/${QUEBEC_THEME_NAME}/logo.svg`,
  woodenShelf: `${href}/${QUEBEC_THEME_NAME}/wooden-shelf.webp`,
};

export const summerImages = {
  ...normalImages,
  homeBgLandscape: `${href}/${SUMMER_THEME_NAME}/home-landscape.webp`,
  homeBgPortrait: `${href}/${SUMMER_THEME_NAME}/home-portrait.webp`,
};

export const halloweenImages = {
  ...normalImages,
  bookSide: `${href}/${HALLOWEEN_THEME_NAME}/book-side.webp`,
  bookWall: `${href}/${HALLOWEEN_THEME_NAME}/book-wall.webp`,
  homeBgLandscape: `${href}/${HALLOWEEN_THEME_NAME}/home-landscape.webp`,
  homeBgPortrait: `${href}/${HALLOWEEN_THEME_NAME}/home-portrait.webp`,
  logoWebsite: `${href}/${HALLOWEEN_THEME_NAME}/logo.svg`,
  woodenShelf: `${href}/${HALLOWEEN_THEME_NAME}/wooden-shelf.webp`,
};

export const christmasImages = {
  ...normalImages,
  bookWall: `${href}/${CHRISTMAS_THEME_NAME}/book-wall.webp`,
  homeBgLandscape: `${href}/${CHRISTMAS_THEME_NAME}/home-landscape.webp`,
  homeBgPortrait: `${href}/${CHRISTMAS_THEME_NAME}/home-portrait.webp`,
  logoWebsite: `${href}/${CHRISTMAS_THEME_NAME}/logo.svg`,
  woodenShelf: `${href}/${CHRISTMAS_THEME_NAME}/wooden-shelf.webp`,
};
