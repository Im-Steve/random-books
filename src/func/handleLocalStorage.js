const STORAGE_NAME_LIKED_BOOKS = 'likedBooks';

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
  const likedBooks = localStorage.getItem(STORAGE_NAME_LIKED_BOOKS);
  if (likedBooks) {
    return JSON.parse(likedBooks);
  }
  return {};
}

export function getArrayOfLikedBooks() {
  const likedBooks = localStorage.getItem(STORAGE_NAME_LIKED_BOOKS);
  if (likedBooks) {
    return Object.values(JSON.parse(likedBooks));
  }
  return [];
}

export function setLikedBooks(books) {
  const likedBooks = getLikedBooks();
  const newBooks = { ...books, ...likedBooks };
  const sortedBooks = sortLikedBooks(newBooks);

  try {
    localStorage.setItem(STORAGE_NAME_LIKED_BOOKS, JSON.stringify(sortedBooks));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

export function addOneLikedBook(book) {
  if (!book.ISBN) {
    return;
  }

  const shortBook = {
    ISBN: book.ISBN,
    title: book.title,
    authors: book.authors,
    cover: book.cover,
    mainCategories: book.mainCategories,
    subcategories: book.subcategories,
    updateDate: new Date(),
  };

  const likedBooks = getLikedBooks();
  likedBooks[shortBook.ISBN] = shortBook;
  const sortedBooks = sortLikedBooks(likedBooks);

  try {
    localStorage.setItem(STORAGE_NAME_LIKED_BOOKS, JSON.stringify(sortedBooks));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

export function removeOneLikedBook(book) {
  const likedBooks = getLikedBooks();
  delete likedBooks[book.ISBN];

  try {
    localStorage.setItem(STORAGE_NAME_LIKED_BOOKS, JSON.stringify(likedBooks));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}
