import { useSearchParams } from 'react-router-dom';

export default function getUrlFilterParams() {
  const [searchParams] = useSearchParams();

  const mainCategory = searchParams.get('mainCategory') || '';
  const subcategory = searchParams.get('subcategory') || '';
  const author = searchParams.get('author') || '';
  const publisher = searchParams.get('publisher') || '';
  const collection = searchParams.get('collection') || '';
  const minOfPages = searchParams.get('minOfPages') || '';
  const maxOfPages = searchParams.get('maxOfPages') || '';
  const minYear = searchParams.get('minYear') || '';
  const maxYear = searchParams.get('maxYear') || '';

  let keywords = searchParams.get('keywords');
  keywords = `${keywords && keywords[keywords.length - 1] !== ',' ? `${keywords}, ` : ''}${keywords && keywords[keywords.length - 1] === ',' ? `${keywords} ` : ''}${author ? `${author}, ` : ''}${publisher ? `${publisher}, ` : ''}${collection ? `${collection}, ` : ''}`;

  return {
    mainCategory,
    subcategory,
    author,
    publisher,
    collection,
    minOfPages,
    maxOfPages,
    minYear,
    maxYear,
    keywords,
  };
}
