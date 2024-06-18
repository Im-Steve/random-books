import { fixUrlText, formatPath } from './formatData';

const URL_404 = `${window.location.origin}/404`;

export function getBookUrl(book) {
  if (!book || !book.ISBN) {
    return URL_404;
  }

  if (Array.isArray(book.mainCategories) && book.mainCategories.length > 0) {
    if (book.mainCategories[0] === 'Wattpad') {
      if (Array.isArray(book.subcategories) && book.subcategories.length > 0) {
        return `${window.location.origin}/book/${formatPath(book.mainCategories[0])}/${book.ISBN}?subcategory=${formatPath(book.subcategories[0])}`;
      }
      return URL_404;
    }
    return `${window.location.origin}/book/${formatPath(book.mainCategories[0])}/${book.ISBN}`;
  }
  return URL_404;
}

export function getRandomizerUrl(filterParams) {
  if (filterParams && filterParams.mainCategory) {
    return `/randomizer?mainCategory=${formatPath(filterParams.mainCategory)}
    ${filterParams.subcategory ? `&subcategory=${formatPath(filterParams.subcategory)}` : ''}
    ${filterParams.keywords ? `&keywords=${fixUrlText(filterParams.keywords)}` : ''}
    ${filterParams.author ? `&author=${fixUrlText(filterParams.author)}` : ''}
    ${filterParams.publisher ? `&publisher=${fixUrlText(filterParams.publisher)}` : ''}
    ${filterParams.collection ? `&collection=${fixUrlText(filterParams.collection)}` : ''}
    ${filterParams.minOfPages ? `&minOfPages=${fixUrlText(filterParams.minOfPages)}` : ''}
    ${filterParams.maxOfPages ? `&maxOfPages=${fixUrlText(filterParams.maxOfPages)}` : ''}
    ${filterParams.minYear ? `&minYear=${fixUrlText(filterParams.minYear)}` : ''}
    ${filterParams.maxYear ? `&maxYear=${fixUrlText(filterParams.maxYear)}` : ''}`.replace(/\s{3,}/g, '');
  }
  return URL_404;
}
