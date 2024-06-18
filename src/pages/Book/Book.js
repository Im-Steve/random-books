import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ActionButtons from '../../components/ActionButtons/ActionButtons';
import BookCard from '../../components/BookCard/BookCard';
import BooksNavbar from '../../components/BooksNavbar/BooksNavbar';
import { findOneBook } from '../../func/fetchBooks';
import getUrlFilterParams from '../../func/getUrlFilterParams';
import PageLoading from '../../components/PageLoading/PageLoading';
import PageNotFound from '../PageNotFound/PageNotFound';

function Book() {
  const { isbn, mainCategory } = useParams();
  const { subcategory } = getUrlFilterParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const matchingBook = await findOneBook(isbn, mainCategory, subcategory);
      setBook(matchingBook);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <BooksNavbar left="home" right="likes" />
      {loading && <PageLoading />}

      {!loading && book && (
        <>
          <BookCard book={book} />
          <ActionButtons singleBook book={book} />
        </>
      )}

      {!loading && !book && <PageNotFound />}
    </>
  );
}

export default Book;
