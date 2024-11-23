import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ActionButtons from '../../components/ActionButtons/ActionButtons';
import BookCard from '../../components/BookCard/BookCard';
import BooksNavbar from '../../components/BooksNavbar/BooksNavbar';
import { FAKE_LOADING_TIME, FAKE_SAFARI_TIME } from '../../constants';
import { findOneBook } from '../../func/fetchBooks';
import getUrlFilterParams from '../../func/getUrlFilterParams';
import isSafari from '../../func/isSafari';
import PageLoading from '../../components/PageLoading/PageLoading';
import PageNotFound from '../PageNotFound/PageNotFound';
import { sendPageViewGA } from '../../analytics';

function Book() {
  sendPageViewGA();
  const location = useLocation();

  const {
    id,
    isbn,
    mainCategory,
    subcategory,
    language,
  } = getUrlFilterParams();

  const [allBooksInTheCategory, setAllBooksInTheCategory] = useState([]);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fakeLoading, setFakeLoading] = useState(true);

  useEffect(() => {
    const refreshTimer = setTimeout(() => {
      setFakeLoading(true);
      setLoading(true);
      setBook(null);
    }, 100);

    const fakeLoadingTimer = setTimeout(() => {
      setFakeLoading(false);
    }, !isSafari() ? FAKE_LOADING_TIME : FAKE_SAFARI_TIME);

    const fetchData = async () => {
      const {
        data: matchingBook,
        unfilteredData,
      } = await findOneBook(id || isbn, mainCategory, subcategory, language);

      setAllBooksInTheCategory(unfilteredData);
      setBook(matchingBook);
      setLoading(false);
    };

    const fetchTimer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(refreshTimer);
      clearTimeout(fakeLoadingTimer);
      clearTimeout(fetchTimer);
    };
  }, [location]);

  return (
    <>
      <BooksNavbar left="home" right="likes" />

      {(fakeLoading || loading) && <PageLoading />}

      {!fakeLoading && !loading && book && (
        <>
          <BookCard book={book} allBooksInTheCategory={allBooksInTheCategory} />
          <ActionButtons singleBook book={book} />
        </>
      )}

      {!fakeLoading && !loading && !book && <PageNotFound />}
    </>
  );
}

export default Book;
