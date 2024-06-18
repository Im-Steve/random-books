export function getWindowHeight() {
  return window.visualViewport.height;
}

export function getWindowWidth() {
  return window.visualViewport.width;
}

export function getOrientation() {
  return getWindowWidth() > getWindowHeight() ? 'landscape' : 'portrait';
}

export function getIsPortrait() {
  return getOrientation() === 'portrait';
}

export function isMobile() {
  return /Mobi/i.test(window.navigator.userAgent);
}
