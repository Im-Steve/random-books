import { fixUrlText, formatPath } from './formatData';

export function getBookUrl(book) {
  if (book && Array.isArray(book.mainCategories) && book.mainCategories.length > 0) {
    return `${window.location.origin}/book/${formatPath(book.mainCategories[0])}/${book.ISBN}`;
  }
  return `${window.location.origin}/404`;
}

export function getRandomizerUrl(filterParams) {
  if (filterParams) {
    return `/randomizer?mainCategory=${formatPath(filterParams.mainCategory)}&subcategory=${filterParams.subcategory || ''}&keywords=${fixUrlText(filterParams.keywords)}&author=${fixUrlText(filterParams.author)}&publisher=${fixUrlText(filterParams.publisher)}&collection=${fixUrlText(filterParams.collection)}&minOfPages=${fixUrlText(filterParams.minOfPages)}&maxOfPages=${fixUrlText(filterParams.maxOfPages)}&minYear=${fixUrlText(filterParams.minYear)}&maxYear=${fixUrlText(filterParams.maxYear)}&language=${fixUrlText(filterParams.language)}`;
  }
  return `${window.location.origin}/404`;
}
