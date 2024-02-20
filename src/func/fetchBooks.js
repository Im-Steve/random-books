import fetchJson from './fetchJson';
import { fixUrlText } from './formatData';
import {
  getBookDataSrc,
  getFeaturedBooksSrc,
  getCurrentFeaturedOnes,
} from './getSrc';

function valueIncludesKeywords(value, keywordsArray) {
  if (typeof value !== 'string' || !Array.isArray(keywordsArray)) {
    return false;
  }

  let keywordsAreIncluded = false;
  const valueNormalized = fixUrlText(value);

  keywordsArray.forEach((keyword) => {
    const keywordNormalized = fixUrlText(keyword);

    if (valueNormalized.includes(keywordNormalized)) {
      keywordsAreIncluded = true;
    }
  });

  return keywordsAreIncluded;
}

export async function searchBooks(filterParams) {
  let fetchedBooks = null;
  let fetchedError = null;
  const filteredBooks = [];

  if (filterParams && filterParams.mainCategory) {
    const { data, error } = await fetchJson(getBookDataSrc(filterParams.mainCategory));
    fetchedBooks = data;
    fetchedError = error;
  }

  if (!Array.isArray(fetchedBooks) || fetchedError) {
    return { data: [], error: fetchedError };
  }

  fetchedBooks.forEach((book) => {
    let toAdd = true;

    if (!book.ISBN) {
      toAdd = false;
    }

    if (filterParams.mainCategory !== 'en-vedette' && (!Array.isArray(book.sellers) || book.sellers.length < 2)) {
      toAdd = false;
    }

    if (filterParams.subcategory) {
      if (Array.isArray(book.subcategories)) {
        const bookSubcatFixed = book.subcategories.map((subcat) => fixUrlText(subcat));
        if (!bookSubcatFixed.includes(fixUrlText(filterParams.subcategory))) {
          toAdd = false;
        }
      } else {
        toAdd = false;
      }
    }

    if (filterParams.keywords) {
      const keywordsSplit = filterParams.keywords.split(/[,]+/);
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

    if (filterParams.minOfPages && !Number.isNaN(filterParams.minOfPages)
    && (
      !book.nbOfPages
      || Number.isNaN(book.nbOfPages)
      || book.nbOfPages < filterParams.minOfPages)
    ) {
      toAdd = false;
    }
    if (filterParams.maxOfPages && !Number.isNaN(filterParams.maxOfPages)
    && (
      !book.nbOfPages
      || Number.isNaN(book.nbOfPages)
      || book.nbOfPages > filterParams.maxOfPages)
    ) {
      toAdd = false;
    }

    const bookReleaseYear = new Date(book.releaseDate).getFullYear();
    if (filterParams.minYear && !Number.isNaN(filterParams.minYear)
    && (!book.releaseDate || bookReleaseYear < filterParams.minYear)) {
      toAdd = false;
    }
    if (filterParams.maxYear && !Number.isNaN(filterParams.maxYear)
    && (!book.releaseDate || bookReleaseYear > filterParams.maxYear)) {
      toAdd = false;
    }

    if (filterParams.language && filterParams.language !== book.language) {
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
  || bookBundle.length <= 1
  || !Array.isArray(bookBundle[0].mainCategories)
  || bookBundle[0].mainCategories[0] === 'En vedette') {
    return bookBundle;
  }

  const featuredBooksResponse = await fetchJson(getFeaturedBooksSrc());
  const featuredBooks = featuredBooksResponse.data || [];
  const currentOnesResponse = await fetchJson(getCurrentFeaturedOnes());
  const currentFeaturedOnes = currentOnesResponse.data || [];

  if (!Array.isArray(featuredBooks)
  || featuredBooks.length === 0
  || !Array.isArray(currentFeaturedOnes.special1)
  || currentFeaturedOnes.special1.length === 0) {
    return bookBundle;
  }

  const featuredIsbn1 = currentFeaturedOnes.special1[
    Math.floor(Math.random() * currentFeaturedOnes.special1.length)
  ];
  const featuredBook1 = featuredBooks.find((book) => book.ISBN === featuredIsbn1);
  bookBundle.splice(2, 0, { ...featuredBook1, mediaType: 'book' });

  if (!Array.isArray(currentFeaturedOnes.special2)
  || currentFeaturedOnes.special2.length === 0
  || bookBundle.length <= 3) {
    return bookBundle;
  }

  const featuredIsbn2 = currentFeaturedOnes.special2[
    Math.floor(Math.random() * currentFeaturedOnes.special2.length)
  ];
  const featuredBook2 = featuredBooks.find((book) => book.ISBN === featuredIsbn2);
  bookBundle.splice(4, 0, { ...featuredBook2, mediaType: 'book' });

  return bookBundle;
}
