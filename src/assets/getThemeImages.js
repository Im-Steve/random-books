import {
  getTheme,
  QUEBEC_THEME_NAME,
  SUMMER_THEME_NAME,
  HALLOWEEN_THEME_NAME,
  CHRISTMAS_THEME_NAME,
} from '../getTheme';
import {
  normalImages,
  quebecNationalDayImages,
  summerImages,
  halloweenImages,
  christmasImages,
} from './themeImages';

export default function getThemeImages() {
  const theme = getTheme();

  switch (theme) {
    case QUEBEC_THEME_NAME:
      return quebecNationalDayImages;
    case SUMMER_THEME_NAME:
      return summerImages;
    case HALLOWEEN_THEME_NAME:
      return halloweenImages;
    case CHRISTMAS_THEME_NAME:
      return christmasImages;
    default:
      return normalImages;
  }
}
