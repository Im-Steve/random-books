const STORAGE_NAME_DISPLAY_ADULT_CONTENT = 'displayAdultContent';

export function setDisplayAdultContent(displayAdultContent) {
  try {
    sessionStorage.setItem(STORAGE_NAME_DISPLAY_ADULT_CONTENT, JSON.stringify(displayAdultContent));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

export function getDisplayAdultContent() {
  const displayAdultContent = sessionStorage.getItem(STORAGE_NAME_DISPLAY_ADULT_CONTENT);
  if (displayAdultContent) {
    return JSON.parse(displayAdultContent);
  }
  return false;
}
