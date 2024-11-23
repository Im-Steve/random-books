import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import BookDisplayCase from '../../components/BookDisplayCase/BookDisplayCase';
import { FAKE_LOADING_TIME } from '../../constants';
import getUrlFilterParams from '../../func/getUrlFilterParams';
import PageLoading from '../../components/PageLoading/PageLoading';
import PageNotFound from '../PageNotFound/PageNotFound';
import { searchBooks, sortSeries } from '../../func/fetchBooks';
import { sendPageViewGA } from '../../analytics';

function Series() {
  sendPageViewGA();
  const location = useLocation();

  const { mainCategory, seriesCode, language } = getUrlFilterParams();

  const [seriesBooks, setSeriesBooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fakeLoading, setFakeLoading] = useState(true);

  useEffect(() => {
    const fakeLoadingTimer = setTimeout(() => {
      setFakeLoading(false);
    }, FAKE_LOADING_TIME);

    const fetchData = async () => {
      if (mainCategory && seriesCode) {
        let sortedBooks = [];

        const { data } = await searchBooks({
          mainCategory,
          seriesCode,
          language,
        });

        if (Array.isArray(data) && data.length > 0) {
          sortedBooks = sortSeries(data);
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
          isForSeries
          books={seriesBooks}
          seriesName={seriesBooks[0].seriesName}
        />
      )}

      {!fakeLoading && !loading && (!Array.isArray(seriesBooks) || seriesBooks.length === 0) && (
        <PageNotFound />
      )}
    </>
  );
}

export default Series;
