import { FEATURED_CATEGORIES } from '../constants';
import fetchJSON from './fetchJSON';
import { fixUrlText, formatFileName } from './formatData';
import {
  getBookDataSrc,
  getCurrentFeaturedSrc,
  getFeaturedBooksSrc,
} from './getExternalSrc';
import getLanguage from '../i18n/getLanguage';
import isAdultContent from './isAdultContent';

export async function fetchBooks(filterParams = {}) {
  let fetchedBooks = null;
  let fetchedError = null;

  const language = filterParams.language || getLanguage();

  if (filterParams.mainCategory) {
    const localLangJSON = await fetchJSON(
      getBookDataSrc(
        filterParams.mainCategory,
        filterParams.subcategory,
        language,
      ),
    );
    fetchedBooks = localLangJSON.data;
    fetchedError = localLangJSON.error;

    if (!Array.isArray(fetchedBooks) || fetchedBooks.length === 0) {
      const otherLangJSON = await fetchJSON(
        getBookDataSrc(
          filterParams.mainCategory,
          filterParams.subcategory,
          language.includes('fr') ? 'en' : 'fr',
        ),
      );
      fetchedBooks = otherLangJSON.data;
      fetchedError = otherLangJSON.error;
    }
  } else {
    return { data: [], error: 'no main category' };
  }

  return { data: fetchedBooks, error: fetchedError };
}

export async function findOneBook(id, mainCategory, subcategory, language) {
  let matchingBook = null;

  const {
    data: fetchedBooks,
    error: fetchedError,
  } = await fetchBooks({ mainCategory, subcategory, language });

  if (Array.isArray(fetchedBooks) && fetchedBooks.length > 0) {
    fetchedBooks.every((book) => {
      const bookID = book.id || book.ISBN;
      if (typeof bookID === 'string'
      && bookID.split('-')[0] === id.split('-')[0]) {
        if (FEATURED_CATEGORIES.includes(mainCategory)
        || formatFileName(mainCategory) === 'wattpad') {
          matchingBook = book;
        }
        if (Array.isArray(book.sellers) && book.sellers.length !== 0) {
          matchingBook = book;
        }
        return false;
      }
      return true;
    });
  }

  return { data: matchingBook, error: fetchedError, unfilteredData: fetchedBooks };
}

function valueIncludesKeywords(value, keywordsArray) {
  if (typeof value !== 'string' || !Array.isArray(keywordsArray)) {
    return false;
  }

  let keywordsAreIncluded = false;
  const valueNormalized = fixUrlText(value);

  keywordsArray.forEach((keyword) => {
    if (keyword) {
      const keywordNormalized = fixUrlText(keyword);

      if (valueNormalized.includes(keywordNormalized)) {
        keywordsAreIncluded = true;
      }
    }
  });

  return keywordsAreIncluded;
}

export async function searchBooks(filterParams = {}) {
  let fetchedBooks = filterParams.booksProp;
  let fetchedError = null;
  const filteredBooks = [];

  const language = filterParams.language || getLanguage();

  if (!Array.isArray(filterParams.booksProp)
  || filterParams.booksProp.length === 0) {
    const { data, error } = await fetchBooks({ ...filterParams, language });
    fetchedBooks = data;
    fetchedError = error;
  }

  if (!Array.isArray(fetchedBooks) || fetchedBooks.length === 0) {
    return { data: [], error: fetchedError, unfilteredData: [] };
  }

  fetchedBooks.forEach((book) => {
    let toAdd = true;

    if (!book.id && !book.ISBN) {
      toAdd = false;
    }

    if (!book.cover) {
      toAdd = false;
    }

    if (!FEATURED_CATEGORIES.includes(filterParams.mainCategory)
    && formatFileName(filterParams.mainCategory) !== 'wattpad'
    && (!Array.isArray(book.sellers) || book.sellers.length === 0)) {
      toAdd = false;
    }

    let isManga;
    if (Array.isArray(book.mainCategories)) {
      isManga = book.mainCategories.some(
        (cat) => cat.toLowerCase().includes('manga'),
      );
    }
    if (!isManga && Array.isArray(book.subcategories)) {
      isManga = book.subcategories.some(
        (cat) => cat.toLowerCase().includes('manga'),
      );
    }
    if (isManga && book.seriesPosition && book.seriesPosition > 5
    && !filterParams.keywords
    && !filterParams.minOfPages
    && !filterParams.maxOfPages
    && !filterParams.minYear
    && !filterParams.maxYear
    && !filterParams.author
    && !filterParams.publisher
    && !filterParams.collection
    && !filterParams.seriesCode
    && !filterParams.sortByNewest
    ) {
      toAdd = false;
    }

    if (filterParams.subcategory) {
      if (Array.isArray(book.subcategories)) {
        const bookSubcatFixed = book.subcategories.map((subcat) => formatFileName(subcat));
        if (!bookSubcatFixed.includes(formatFileName(filterParams.subcategory))) {
          toAdd = false;
        }
      } else {
        toAdd = false;
      }
    }

    if (isAdultContent(book)
    && !filterParams.subcategory
    && !filterParams.author
    && !filterParams.publisher
    && !filterParams.collection
    && !filterParams.seriesCode
    ) {
      toAdd = false;
    }

    if (filterParams.keywords && typeof filterParams.keywords === 'string') {
      const keywordsSplit = filterParams.keywords.trim().split(/[,]+/);
      if (!valueIncludesKeywords(book.ISBN, keywordsSplit)
      && !valueIncludesKeywords(book.title, keywordsSplit)
      && !valueIncludesKeywords(Array.isArray(book.authors) ? book.authors.join(', ') : '', keywordsSplit)
      && !valueIncludesKeywords(book.description, keywordsSplit)
      && !valueIncludesKeywords(book.publisher, keywordsSplit)
      && !valueIncludesKeywords(book.collection, keywordsSplit)) {
        toAdd = false;
      }
    }

    if (filterParams.author) {
      if (!valueIncludesKeywords(Array.isArray(book.authors) ? book.authors.join(', ') : '', [filterParams.author])) {
        toAdd = false;
      }
    }

    if (filterParams.publisher) {
      if (fixUrlText(book.publisher) !== fixUrlText(filterParams.publisher)) {
        toAdd = false;
      }
    }

    if (filterParams.collection) {
      if (fixUrlText(book.collection) !== fixUrlText(filterParams.collection)) {
        toAdd = false;
      }
    }

    if (filterParams.minOfPages
    && !Number.isNaN(filterParams.minOfPages)
    && filterParams.minOfPages > 0
    && (
      !book.nbOfPages
      || Number.isNaN(book.nbOfPages)
      || book.nbOfPages < filterParams.minOfPages)
    ) {
      toAdd = false;
    }
    if (filterParams.maxOfPages
    && !Number.isNaN(filterParams.maxOfPages)
    && filterParams.maxOfPages > 0
    && (
      !book.nbOfPages
      || Number.isNaN(book.nbOfPages)
      || book.nbOfPages > filterParams.maxOfPages)
    ) {
      toAdd = false;
    }

    const bookReleaseYear = new Date(book.releaseDate).getFullYear();
    if (filterParams.minYear
    && !Number.isNaN(filterParams.minYear)
    && filterParams.minYear > 0
    && (
      !book.releaseDate
      || bookReleaseYear < filterParams.minYear)
    ) {
      toAdd = false;
    }
    if (filterParams.maxYear
    && !Number.isNaN(filterParams.maxYear)
    && filterParams.maxYear > 0
    && (
      !book.releaseDate
      || bookReleaseYear > filterParams.maxYear)
    ) {
      toAdd = false;
    }

    if (filterParams.seriesCode) {
      if (fixUrlText(book.seriesCode) !== fixUrlText(filterParams.seriesCode)) {
        toAdd = false;
      }
    }

    if (toAdd) {
      filteredBooks.push(book);
    }
  });

  filteredBooks.sort((a, b) => {
    if (a.rating === undefined) return 1;
    if (b.rating === undefined) return -1;

    return b.rating - a.rating;
  });

  return { data: filteredBooks, error: fetchedError, unfilteredData: fetchedBooks };
}

export function shuffleBooks(books) {
  if (Array.isArray(books)) {
    books.sort(() => 0.5 - Math.random());
  }

  return books;
}

export function sortBooksByNewest(books) {
  if (Array.isArray(books)) {
    books.sort((a, b) => {
      const getDate = (obj) => {
        const dateStr = obj.dateAdded || obj.releaseDate;
        return dateStr ? new Date(dateStr) : new Date(0);
      };

      const dateA = getDate(a);
      const dateB = getDate(b);

      return dateB - dateA;
    });
  }

  return books;
}

export async function addFeaturedContent(bookBundle) {
  if (!Array.isArray(bookBundle)
  || bookBundle.length === 0
  || !Array.isArray(bookBundle[0].mainCategories)
  || FEATURED_CATEGORIES.includes(bookBundle[0].mainCategories[0])) {
    return bookBundle;
  }

  const localLangFeaturedBooksJSON = await fetchJSON(getFeaturedBooksSrc(getLanguage()));
  const featuredBooks = localLangFeaturedBooksJSON.data || [];

  const currentFeaturedJSON = await fetchJSON(getCurrentFeaturedSrc());
  const currentFeatured = currentFeaturedJSON.data || [];

  let specials1;
  let specials2;
  if (Array.isArray(currentFeatured)) {
    specials1 = currentFeatured.filter(
      (featured) => typeof featured.language === 'string'
        && featured.language.toLowerCase().includes(getLanguage())
        && featured.priority && featured.priority === 1,
    );
    specials2 = currentFeatured.filter(
      (featured) => typeof featured.language === 'string'
        && featured.language.toLowerCase().includes(getLanguage())
        && featured.priority !== 1,
    );
  }

  if (!Array.isArray(specials1)
  || specials1.length === 0
  || bookBundle.length <= 3) {
    return bookBundle;
  }

  let featuredElem1 = specials1[
    Math.floor(Math.random() * specials1.length)
  ];
  if (featuredElem1.type === 'book') {
    if (Array.isArray(featuredBooks)) {
      featuredElem1 = featuredBooks.find((book) => book.id === featuredElem1.id);
      featuredElem1.type = 'book';
    } else {
      featuredElem1 = null;
    }
  }
  if (featuredElem1) {
    bookBundle.splice(Math.random() < 0.5 ? 2 : 3, 0, featuredElem1);
  }

  if (!Array.isArray(specials2)
  || specials2.length === 0
  || bookBundle.length <= 6) {
    return bookBundle;
  }

  let featuredElem2 = specials2[
    Math.floor(Math.random() * specials2.length)
  ];
  if (featuredElem2.type === 'book') {
    if (Array.isArray(featuredBooks)) {
      featuredElem2 = featuredBooks.find((book) => book.id === featuredElem2.id);
      featuredElem2.type = 'book';
    } else {
      featuredElem2 = null;
    }
  }
  if (featuredElem2) {
    bookBundle.splice(Math.random() < 0.5 ? 5 : 6, 0, featuredElem2);
  }

  return bookBundle;
}

export function sortBooksAlphabetically(books) {
  if (Array.isArray(books)) {
    return books.sort((a, b) => {
      const titleA = typeof a.title === 'string' && a.title.trim() !== '' ? a.title.toLowerCase() : '';
      const titleB = typeof b.title === 'string' && b.title.trim() !== '' ? b.title.toLowerCase() : '';

      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });
  }

  return books;
}

export function sortSeries(seriesBooks) {
  if (Array.isArray(seriesBooks)) {
    const booksInAlphabeticalOrder = sortBooksAlphabetically(seriesBooks);

    return booksInAlphabeticalOrder.sort((a, b) => {
      const getSeriesPosition = (book) => {
        const pos = book.seriesPosition;
        return Number.isInteger(pos) ? pos : Infinity;
      };

      const posA = getSeriesPosition(a);
      const posB = getSeriesPosition(b);
      return posA - posB;
    });
  }

  return seriesBooks;
}
