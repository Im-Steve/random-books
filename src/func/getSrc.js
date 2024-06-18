import { formatPath } from './formatData';

export function getAuthorImgSrc(authorImg) {
  if (authorImg && authorImg.includes('author_images')) {
    return `https://tiger-database.github.io/${authorImg.split('\\')[0]}/${authorImg.split('\\')[1]}`;
  }
  return authorImg;
}

export function getBookCoverSrc(cover) {
  if (cover && cover.includes('book_covers')) {
    return `https://tiger-database.github.io/${cover.split('\\')[0]}/${cover.split('\\')[1]}`;
  }
  return cover;
}

export function getBookDataSrc(mainCategory, subcategory) {
  if (formatPath(mainCategory) === 'wattpad') {
    return `https://tiger-database.github.io/wp_book_data_public/${formatPath(subcategory)}.json`;
  }
  return `https://tiger-database.github.io/book_data_public/${formatPath(mainCategory)}.json`;
}

export function getCurrentFeaturedSrc() {
  return 'https://tiger-database.github.io/book_data_public/specials.json';
}

export function getFeaturedBooksSrc() {
  return 'https://tiger-database.github.io/book_data_public/en-vedette.json';
}

export function getMainCategoriesSrc() {
  return 'https://tiger-database.github.io/book_data_public/mainCategories.json';
}

export function getSubcategoriesSrc() {
  return 'https://tiger-database.github.io/book_data_public/subcategories.json';
}
