const STORAGE_NAME_LIKED_BOOKS = 'likedBooks';
const STORAGE_NAME_TUTORIAL_DONE = 'tutorialDone';

const LIMIT_OF_LIKED_BOOKS = 1000;

function sortLikedBooks(likedBooks = []) {
  if (Array.isArray(likedBooks)) {
    return [...likedBooks].sort((a, b) => new Date(b.updateDate) - new Date(a.updateDate));
  }
  return likedBooks;
}

export function getLikedBooks() {
  const storedData = localStorage.getItem(STORAGE_NAME_LIKED_BOOKS);

  if (storedData) {
    const parsedData = JSON.parse(storedData);

    if (Array.isArray(parsedData)) {
      return parsedData;
    }

    if (typeof parsedData === 'object' && parsedData !== null) {
      return Object.values(parsedData);
    }

    return [];
  }

  return [];
}

export function getSortedLikedBooks() {
  const likedBooks = getLikedBooks();
  return sortLikedBooks(likedBooks);
}

export function setLikedBooks(books = []) {
  let booksToAdd = books;
  if (!Array.isArray(booksToAdd) && typeof booksToAdd === 'object' && booksToAdd !== null) {
    booksToAdd = Object.values(booksToAdd);
  }
  if (!Array.isArray(booksToAdd)) {
    booksToAdd = [];
  }

  let likedBooks = getLikedBooks();
  if (!Array.isArray(likedBooks)) {
    likedBooks = [];
  }

  let mergedLikedBooks = [...booksToAdd, ...likedBooks]
    .filter((value, index, self) => index === self.findIndex((t) => (
      (t.id && value.id && t.id === value.id) || (t.ISBN && value.ISBN && t.ISBN === value.ISBN)
    )));

  if (mergedLikedBooks.length > LIMIT_OF_LIKED_BOOKS) {
    mergedLikedBooks = sortLikedBooks(mergedLikedBooks);
    mergedLikedBooks = mergedLikedBooks.slice(0, LIMIT_OF_LIKED_BOOKS - 50);
  }

  try {
    localStorage.setItem(STORAGE_NAME_LIKED_BOOKS, JSON.stringify(mergedLikedBooks));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

export function addOneLikedBook(book = {}) {
  if (!book.id && !book.ISBN) {
    return;
  }

  const infoToSave = {
    ...book,
    updateDate: new Date(),
  };

  setLikedBooks([infoToSave]);
}

export function removeOneLikedBook(book = {}) {
  if (!book.id && !book.ISBN) {
    return;
  }

  const likedBooks = getLikedBooks();
  let filteredLikedBooks = [];
  if (Array.isArray(likedBooks)) {
    filteredLikedBooks = likedBooks.filter(
      (likedBook) => !likedBook.id || !book.id || likedBook.id !== book.id,
    );
    filteredLikedBooks = filteredLikedBooks.filter(
      (likedBook) => !likedBook.ISBN || !book.ISBN || likedBook.ISBN !== book.ISBN,
    );

    try {
      localStorage.setItem(STORAGE_NAME_LIKED_BOOKS, JSON.stringify(filteredLikedBooks));
      window.dispatchEvent(new Event('storage'));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
}

export function setTutorialDone(isDone) {
  try {
    localStorage.setItem(STORAGE_NAME_TUTORIAL_DONE, JSON.stringify(isDone));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

export function getTutorialDone() {
  const isDone = localStorage.getItem(STORAGE_NAME_TUTORIAL_DONE);
  if (isDone) {
    return JSON.parse(isDone);
  }
  return false;
}
