import { normalizeText } from './formatData';

export default function isAdultContent(book) {
  return (book.subcategories && normalizeText(book.subcategories.toString()).includes('erotique'))
  || (book.subcategoriesWithLink && normalizeText(book.subcategoriesWithLink.toString()).includes('erotique'));
}
