import { getBookUrl } from './getUrl';

const LIKED_BOOKS_STORAGE_NAME = 'likedBooks';

function compareUpdateDate(a, b) {
  const dateA = new Date(a.updateDate);
  const dateB = new Date(b.updateDate);
  return dateB - dateA;
}

function sortLikedBooks(likedBooks) {
  const sortedKeys = Object.keys(likedBooks).sort(
    (a, b) => compareUpdateDate(likedBooks[a], likedBooks[b]),
  );

  const sortedBooks = {};
  sortedKeys.forEach((key) => {
    if (likedBooks[key].ISBN) {
      sortedBooks[key] = likedBooks[key];
    }
  });
  return sortedBooks;
}

export function getLikedBooks() {
  const likedBooks = localStorage.getItem(LIKED_BOOKS_STORAGE_NAME);
  if (likedBooks) {
    return JSON.parse(likedBooks);
  }
  return {};
}

export function getArrayOfLikedBooks() {
  const likedBooks = localStorage.getItem(LIKED_BOOKS_STORAGE_NAME);
  if (likedBooks) {
    return Object.values(JSON.parse(likedBooks));
  }
  return [];
}

export function setLikedBooks(books) {
  const likedBooks = getLikedBooks();
  const newBooks = { ...books, ...likedBooks };
  const sortedBooks = sortLikedBooks(newBooks);

  let error = null;
  try {
    localStorage.setItem(LIKED_BOOKS_STORAGE_NAME, JSON.stringify(sortedBooks));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    error = err;
    // eslint-disable-next-line no-console
    console.error(err);
  }

  return error;
}

export function addOneLikedBook(book) {
  if (!book.ISBN) {
    return 'no ISBN';
  }

  const shortenedBook = {
    ISBN: book.ISBN,
    title: book.title,
    authors: book.authors,
    cover: book.cover,
    mainCategories: book.mainCategories,
    subcategories: book.subcategories,
    internalLink: getBookUrl(book),
    updateDate: new Date(),
  };

  const likedBooks = getLikedBooks();
  likedBooks[shortenedBook.ISBN] = shortenedBook;
  const sortedBooks = sortLikedBooks(likedBooks);

  let error = null;
  try {
    localStorage.setItem(LIKED_BOOKS_STORAGE_NAME, JSON.stringify(sortedBooks));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    error = err;
    // eslint-disable-next-line no-console
    console.error(err);
  }

  return error;
}

export function removeOneLikedBook(book) {
  const likedBooks = getLikedBooks();
  delete likedBooks[book.ISBN];

  let error = null;
  try {
    localStorage.setItem(LIKED_BOOKS_STORAGE_NAME, JSON.stringify(likedBooks));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    error = err;
    // eslint-disable-next-line no-console
    console.error(err);
  }

  return error;
}
