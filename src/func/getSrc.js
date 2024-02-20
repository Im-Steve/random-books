export function getAuthorImgSrc(authorImg) {
  if (authorImg && authorImg.includes('author_images')) {
    return `https://tiger-database.github.io/${authorImg.split('\\')[0]}/${authorImg.split('\\')[1]}`;
  }
  return authorImg;
}

export function getBookCoverSrc(cover) {
  if (cover && cover.includes('book_covers')) {
    return `https://tiger-database.github.io/${cover.split('\\')[1]}/${cover.split('\\')[2]}`;
  }
  return cover;
}

export function getBookDataSrc(category) {
  return `https://tiger-database.github.io/book_data_public/${category}.json`;
}

export function getCategoriesSrc() {
  return 'https://tiger-database.github.io/book_data_public/categories.json';
}

export function getFeaturedBooksSrc() {
  return 'https://tiger-database.github.io/book_data_public/en-vedette.json';
}

export function getCurrentFeaturedOnes() {
  return 'https://tiger-database.github.io/book_data_public/specials.json';
}
