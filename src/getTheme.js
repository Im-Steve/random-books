export const NORMAL_THEME_NAME = 'normal';
export const QUEBEC_THEME_NAME = 'quebec';
export const SUMMER_THEME_NAME = 'summer';
export const HALLOWEEN_THEME_NAME = 'halloween';
export const CHRISTMAS_THEME_NAME = 'christmas';

export function getTheme() {
  const today = new Date();
  const month = today.getMonth();
  const day = today.getDate();

  if (month === 5 && day >= 17 && day <= 26) {
    return QUEBEC_THEME_NAME;
  }

  if (month === 6 || month === 7) {
    return SUMMER_THEME_NAME;
  }

  if (month === 9 && day >= 7) {
    return HALLOWEEN_THEME_NAME;
  }

  if ((month === 10 && day >= 24) || month === 11) {
    return CHRISTMAS_THEME_NAME;
  }

  return NORMAL_THEME_NAME;
}
