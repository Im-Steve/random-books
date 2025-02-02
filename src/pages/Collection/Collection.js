import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import BookDisplayCase from '../../components/BookDisplayCase/BookDisplayCase';
import { FAKE_LOADING_TIME } from '../../constants';
import getUrlFilterParams from '../../func/getUrlFilterParams';
import PageLoading from '../../components/PageLoading/PageLoading';
import PageNotFound from '../PageNotFound/PageNotFound';
import { searchBooks, sortBooksAlphabetically } from '../../func/fetchBooks';
import { sendPageViewGA } from '../../analytics';

function Collection() {
  sendPageViewGA();
  const location = useLocation();

  const {
    mainCategory,
    publisher,
    collection,
    language,
  } = getUrlFilterParams();

  const [seriesBooks, setSeriesBooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fakeLoading, setFakeLoading] = useState(true);

  useEffect(() => {
    const fakeLoadingTimer = setTimeout(() => {
      setFakeLoading(false);
    }, FAKE_LOADING_TIME);

    const fetchData = async () => {
      if (mainCategory && publisher && collection) {
        let sortedBooks = [];

        const { data } = await searchBooks({
          mainCategory,
          publisher,
          collection,
          language,
        });

        if (Array.isArray(data) && data.length > 0) {
          sortedBooks = sortBooksAlphabetically(data);
        }

        setSeriesBooks(sortedBooks);
      }
      setLoading(false);
    };

    fetchData();

    return () => {
      clearTimeout(fakeLoadingTimer);
    };
  }, [location]);

  return (
    <>
      {(fakeLoading || loading) && <PageLoading />}

      {!fakeLoading && !loading && Array.isArray(seriesBooks) && seriesBooks.length > 0 && (
        <BookDisplayCase
          isForCollection
          books={seriesBooks}
          collection={seriesBooks[0].collection}
          publisher={seriesBooks[0].publisher}
        />
      )}

      {!fakeLoading && !loading && (!Array.isArray(seriesBooks) || seriesBooks.length === 0) && (
        <PageNotFound />
      )}
    </>
  );
}

export default Collection;
