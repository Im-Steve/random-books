import { useSearchParams } from 'react-router-dom';

function getUrlFilterParams() {
  const [searchParams] = useSearchParams();

  const filterParams = {};
  filterParams.mainCategory = searchParams.get('mainCategory');
  filterParams.subcategory = searchParams.get('subcategory');
  filterParams.keywords = searchParams.get('keywords');
  filterParams.author = searchParams.get('author');
  filterParams.publisher = searchParams.get('publisher');
  filterParams.collection = searchParams.get('collection');
  filterParams.minOfPages = searchParams.get('minOfPages');
  filterParams.maxOfPages = searchParams.get('maxOfPages');
  filterParams.minYear = searchParams.get('minYear');
  filterParams.maxYear = searchParams.get('maxYear');
  filterParams.language = searchParams.get('language');

  return filterParams;
}

export default getUrlFilterParams;
