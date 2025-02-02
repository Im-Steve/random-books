import getLanguage from '../i18n/getLanguage';

export default function ISODateToLocaleDate(ISOstring) {
  const date = new Date(ISOstring);
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  };
  return date.toLocaleString(getLanguage(), options);
}
