import { fixUrlText, formatFileName } from './formatData';
import getLanguage from '../i18n/getLanguage';

const URL_404 = '/404';

export function getBookUrl(book) {
  if (!book || (!book.id && !book.ISBN)) {
    return URL_404;
  }

  if (Array.isArray(book.mainCategories) && book.mainCategories.length > 0) {
    if (book.mainCategories[0].toLowerCase() === 'wattpad') {
      if (Array.isArray(book.subcategories) && book.subcategories.length > 0) {
        return `/book
          ?id=${book.id || book.ISBN}
          &mainCategory=${formatFileName(book.mainCategories[0])}
          &subcategory=${formatFileName(book.subcategories[0])}
          ${book.language ? `&language=${fixUrlText(book.language)}` : ''}`.replace(/\s{3,}/g, '');
      }
      return URL_404;
    }

    return `/book
      ?id=${book.id || book.ISBN}
      &mainCategory=${formatFileName(book.mainCategories[0])}
      ${book.language ? `&language=${fixUrlText(book.language)}` : ''}`.replace(/\s{3,}/g, '');
  }

  return URL_404;
}

export function getRandomizerUrl(filterParams) {
  if (filterParams && filterParams.mainCategory) {
    const language = filterParams.language || getLanguage();

    return `/randomizer
    ?mainCategory=${formatFileName(filterParams.mainCategory)}
    ${filterParams.subcategory ? `&subcategory=${formatFileName(filterParams.subcategory)}` : ''}
    ${filterParams.keywords ? `&keywords=${fixUrlText(filterParams.keywords)}` : ''}
    ${filterParams.author ? `&author=${fixUrlText(filterParams.author)}` : ''}
    ${filterParams.publisher ? `&publisher=${fixUrlText(filterParams.publisher)}` : ''}
    ${filterParams.collection ? `&collection=${fixUrlText(filterParams.collection)}` : ''}
    ${filterParams.minOfPages ? `&minOfPages=${fixUrlText(filterParams.minOfPages)}` : ''}
    ${filterParams.maxOfPages ? `&maxOfPages=${fixUrlText(filterParams.maxOfPages)}` : ''}
    ${filterParams.minYear ? `&minYear=${fixUrlText(filterParams.minYear)}` : ''}
    ${filterParams.maxYear ? `&maxYear=${fixUrlText(filterParams.maxYear)}` : ''}
    ${filterParams.sortByNewest ? `&sortByNewest=${filterParams.sortByNewest}` : ''}
    ${language ? `&language=${fixUrlText(language)}` : ''}`.replace(/\s{3,}/g, '');
  }
  return URL_404;
}

export function getSeriesUrl(book) {
  if (!book
  || !book.seriesCode
  || !Array.isArray(book.mainCategories)
  || book.mainCategories.length === 0
  ) {
    return URL_404;
  }

  return `/series
    ?seriesCode=${fixUrlText(book.seriesCode)}
    &mainCategory=${formatFileName(book.mainCategories[0])}
    ${book.language ? `&language=${fixUrlText(book.language)}` : ''}`.replace(/\s{3,}/g, '');
}

export function getCollectionUrl(book) {
  if (!book
  || !book.publisher
  || !book.collection
  || !Array.isArray(book.mainCategories)
  || book.mainCategories.length === 0
  ) {
    return URL_404;
  }

  if (typeof book.language === 'string' && book.language.toLowerCase().includes('fr')) {
    return getRandomizerUrl({
      mainCategory: Array.isArray(book.mainCategories) ? book.mainCategories[0] : '',
      publisher: book.publisher,
      collection: book.collection,
      language: book.language,
    });
  }

  return `/collection
    ?collection=${fixUrlText(book.collection)}
    &publisher=${fixUrlText(book.publisher)}
    &mainCategory=${formatFileName(book.mainCategories[0])}
    ${book.language ? `&language=${fixUrlText(book.language)}` : ''}`.replace(/\s{3,}/g, '');
}
