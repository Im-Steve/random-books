import { formatFileName } from './formatData';
import getLanguage from '../i18n/getLanguage';

import { imgNoCover } from '../assets/Images';

const adMediaUrl = process.env.REACT_APP_AD_MEDIA_URL;
const authorImagesUrl = process.env.REACT_APP_AUTHOR_IMAGES_URL;
const bookCoversUrl = process.env.REACT_APP_BOOK_COVERS_URL;
const bookDataUrl = process.env.REACT_APP_BOOK_DATA_URL;
const bookImagesUrl = process.env.REACT_APP_BOOK_IMAGES_URL;
const wpBookDataUrl = process.env.REACT_APP_WP_BOOK_DATA_URL;

function getLangPrefix(langProp) {
  const language = langProp || getLanguage();
  if (language.includes('en')) {
    return 'eng_';
  }
  return 'fr_';
}

export function getMainCategoriesSrc() {
  return `${bookDataUrl}/mainCategories.json`;
}

export function getSubcategoriesSrc() {
  return `${bookDataUrl}/subcategories.json`;
}

export function getBookDataSrc(mainCategory, subcategory, langProp) {
  const language = langProp || getLanguage();
  if (formatFileName(mainCategory) === 'wattpad') {
    return `${wpBookDataUrl}/${getLangPrefix(language)}${formatFileName(subcategory)}.json`;
  }
  return `${bookDataUrl}/${getLangPrefix(language)}${formatFileName(mainCategory)}.json`;
}

export function getFeaturedBooksSrc(langProp) {
  const language = langProp || getLanguage();
  if (language.includes('en')) {
    return `${bookDataUrl}/eng_featured.json`;
  }
  return `${bookDataUrl}/fr_en-vedette.json`;
}

export function getCurrentFeaturedSrc() {
  return `${bookDataUrl}/specials.json`;
}

export function getAdMediaSrc(mediaSrc) {
  if (typeof mediaSrc === 'string' && mediaSrc.includes('ad-media')) {
    const splitMediaSrc = mediaSrc.split('\\');
    return `${adMediaUrl}/${splitMediaSrc[1]}`;
  }
  return mediaSrc;
}

export function getAuthorImgSrc(authorImg) {
  if (typeof authorImg === 'string' && authorImg.includes('author_images')) {
    const splitAuthorImg = authorImg.split('\\');
    return `${authorImagesUrl}/${splitAuthorImg[1]}`;
  }
  return authorImg;
}

export function getBookCoverSrc(cover) {
  if (!cover || typeof cover !== 'string') {
    return imgNoCover;
  }
  if (typeof cover === 'string' && cover.includes('book_covers')) {
    const splitCover = cover.split('\\');
    return `${bookCoversUrl}/${splitCover[1]}`;
  }
  return cover;
}

export function getBookImageSrc(image) {
  if (typeof image === 'string' && image.includes('book_images')) {
    const splitImage = image.split('\\');
    return `${bookImagesUrl}/${splitImage[1]}/${splitImage[2]}`;
  }
  return image;
}
