export function normalizeText(text) {
  if (!text || text === 'null' || text === 'undefined') {
    return '';
  }
  if (typeof text !== 'string') {
    return text;
  }

  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function formatPath(path) {
  if (!path || path === 'null' || path === 'undefined') {
    return '';
  }
  if (typeof path !== 'string') {
    return path;
  }

  return normalizeText(path)
    .replace(/\s/g, '-')
    .replace(/\//g, '-')
    .replace(/\\/g, '-')
    .replace(/'/g, '')
    .replace(/\+/g, 'plus')
    .replace(/&/g, 'et');
}

export function fixUrlText(text) {
  if (!text || text === 'null' || text === 'undefined') {
    return '';
  }
  if (typeof text !== 'string') {
    return text;
  }

  return normalizeText(text)
    .replace(/\//g, '-')
    .replace(/\\/g, '-')
    .replace(/\+/g, 'plus')
    .replace(/&/g, 'et');
}
