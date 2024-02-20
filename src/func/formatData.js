export function normalizeText(text) {
  if (!text || text === 'undefined') {
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

export function fixUrlText(text) {
  if (!text || text === 'undefined') {
    return '';
  }
  if (typeof text !== 'string') {
    return text;
  }

  return normalizeText(text)
    .replace('+', '')
    .replace('&', '');
}

export function formatPath(path) {
  if (!path || path === 'undefined') {
    return '';
  }
  if (typeof path !== 'string') {
    return path;
  }

  return normalizeText(path)
    .replace(/\s/g, '-')
    .replace(/\//g, '-');
}
