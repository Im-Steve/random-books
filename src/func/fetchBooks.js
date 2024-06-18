import fetchJSON from './fetchJSON';
import { fixUrlText, formatPath } from './formatData';
import {
  getBookDataSrc,
  getCurrentFeaturedSrc,
  getFeaturedBooksSrc,
} from './getSrc';

export async function fetchBooks(filterParams = {}) {
  let fetchedBooks = null;
  let fetchedError = null;

  if (filterParams.mainCategory) {
    const { data, error } = await fetchJSON(
      getBookDataSrc(filterParams.mainCategory, filterParams.subcategory),
    );
    fetchedBooks = data;
    fetchedError = error;
  } else {
    return { data: [], error: 'no main category' };
  }

  return { data: fetchedBooks, error: fetchedError };
}

export async function findOneBook(isbn, mainCategory, subcategory) {
  let matchingBook = null;

  const {
    data: fetchedBooks,
    error: fetchedError,
  } = await fetchBooks({ mainCategory, subcategory });

  if (Array.isArray(fetchedBooks) && !fetchedError) {
    fetchedBooks.every((book) => {
      if (book.ISBN.split('-')[0] === isbn.split('-')[0]) {
        if (formatPath(mainCategory) === 'en-vedette'
        || formatPath(mainCategory) === 'wattpad') {
          matchingBook = book;
          return false;
        }
        if (formatPath(mainCategory) !== 'en-vedette'
        && formatPath(mainCategory) !== 'wattpad'
        && (Array.isArray(book.sellers) && book.sellers.length >= 2)) {
          matchingBook = book;
          return false;
        }
      }
      return true;
    });
  }

  return matchingBook;
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
  const filteredBooks = [];

  const { data: fetchedBooks, error: fetchedError } = await fetchBooks(filterParams);

  if (!Array.isArray(fetchedBooks) || fetchedError) {
    return { data: [], error: fetchedError };
  }

  fetchedBooks.forEach((book) => {
    let toAdd = true;

    if (!book.ISBN) {
      toAdd = false;
    }

    if (formatPath(filterParams.mainCategory) !== 'en-vedette'
    && formatPath(filterParams.mainCategory) !== 'wattpad'
    && (!Array.isArray(book.sellers) || book.sellers.length < 2)) {
      toAdd = false;
    }

    if (filterParams.mainCategory) {
      if (Array.isArray(book.mainCategories)) {
        const bookCatFixed = book.mainCategories.map((cat) => formatPath(cat));
        if (!bookCatFixed.includes(formatPath(filterParams.mainCategory))) {
          toAdd = false;
        }
      } else {
        toAdd = false;
      }
    }

    if (filterParams.subcategory) {
      if (Array.isArray(book.subcategories)) {
        const bookSubcatFixed = book.subcategories.map((subcat) => formatPath(subcat));
        if (!bookSubcatFixed.includes(formatPath(filterParams.subcategory))) {
          toAdd = false;
        }
      } else {
        toAdd = false;
      }
    }

    if (filterParams.keywords) {
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

    if (toAdd) {
      filteredBooks.push(book);
    }
  });

  filteredBooks.sort((a, b) => {
    if (a.rating === undefined) return 1;
    if (b.rating === undefined) return -1;

    return b.rating - a.rating;
  });

  return { data: filteredBooks, error: fetchedError };
}

export function shuffleBooks(books) {
  if (Array.isArray(books)) {
    books.sort(() => 0.5 - Math.random());
  }

  return books;
}

export async function addFeaturedContent(bookBundle) {
  if (!Array.isArray(bookBundle)
  || bookBundle.length === 0
  || !Array.isArray(bookBundle[0].mainCategories)
  || bookBundle[0].mainCategories[0] === 'En vedette') {
    return bookBundle;
  }

  const featuredBooksResponse = await fetchJSON(getFeaturedBooksSrc());
  const featuredBooks = featuredBooksResponse.data || [];
  const currentFeaturedResponse = await fetchJSON(getCurrentFeaturedSrc());
  const currentFeatured = currentFeaturedResponse.data || [];

  if (!Array.isArray(featuredBooks)
  || featuredBooks.length === 0
  || !Array.isArray(currentFeatured.specials1)
  || currentFeatured.specials1.length === 0) {
    return bookBundle;
  }

  const featuredIsbn1 = currentFeatured.specials1[
    Math.floor(Math.random() * currentFeatured.specials1.length)
  ];
  const featuredBook1 = featuredBooks.find((book) => book.ISBN === featuredIsbn1);
  bookBundle.splice(2, 0, { ...featuredBook1, mediaType: 'book' });

  if (!Array.isArray(currentFeatured.specials2)
  || currentFeatured.specials2.length === 0
  || bookBundle.length <= 3) {
    return bookBundle;
  }

  const featuredIsbn2 = currentFeatured.specials2[
    Math.floor(Math.random() * currentFeatured.specials2.length)
  ];
  const featuredBook2 = featuredBooks.find((book) => book.ISBN === featuredIsbn2);
  bookBundle.splice(4, 0, { ...featuredBook2, mediaType: 'book' });

  return bookBundle;
}
