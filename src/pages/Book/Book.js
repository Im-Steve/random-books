import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ActionButtons from '../../components/ActionButtons/ActionButtons';
import BookCard from '../../components/BookCard/BookCard';
import BooksNavbar from '../../components/BooksNavbar/BooksNavbar';
import fetchJson from '../../func/fetchJson';
import { getBookDataSrc } from '../../func/getSrc';
import PageLoading from '../../components/PageLoading/PageLoading';
import PageNotFound from '../PageNotFound/PageNotFound';

function Book() {
  const { category, isbn } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let matchingBook = null;
      const { data, error } = await fetchJson(getBookDataSrc(category));

      if (Array.isArray(data) && !error) {
        data.every((entry) => {
          if (entry.ISBN === isbn) {
            matchingBook = entry;
            return false;
          }
          return true;
        });
      }

      setBook(matchingBook);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && <PageLoading />}

      {!loading && book && (
        <>
          <BookCard book={book} />
          <ActionButtons singleBook book={book} />
          <BooksNavbar left="home" right="likes" />
        </>
      )}

      {!loading && !book && <PageNotFound />}
    </>
  );
}

export default Book;
