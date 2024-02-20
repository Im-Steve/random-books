function ISODateToLocaleDate(ISOstring) {
  const date = new Date(ISOstring);
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  };
  return date.toLocaleString('fr-FR', options);
}

export default ISODateToLocaleDate;
