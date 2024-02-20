import React, { useEffect, useState } from 'react';

import CancelButton from '../Buttons/CancelButton';
import DeleteButton from '../Buttons/DeleteButton';
import { getArrayOfLikedBooks, removeOneLikedBook } from '../../func/handleLocalStorage';
import { getBookCoverSrc } from '../../func/getSrc';
import i18n from '../../i18n/i18n';
import { imgNoCover } from '../../assets/Images';
import { TrashCan } from '../../assets/Icons';
import './listOfLikes.css';

function ListOfLikes() {
  const [likedBooks, setLikedBooks] = useState([]);
  const [indexToDelete, setIndexToDelete] = useState(null);

  useEffect(() => {
    function handleStorageChange() {
      setLikedBooks(getArrayOfLikedBooks());
    }

    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  function handleDeletion(book) {
    removeOneLikedBook(book);
    setIndexToDelete(null);
  }

  return (
    likedBooks.map((book, index) => (
      <div className="likedBook-container" key={book.ISBN}>
        <a className="likedBook" href={book.internalLink}>
          <p className="likedBook-index">{index + 1}</p>

          <img
            className="likedBook-cover"
            src={book.cover ? getBookCoverSrc(book.cover) : imgNoCover}
            alt="cover"
          />

          <div className="likedBook-info">
            {book.title && <p>{book.title}</p>}
            {Array.isArray(book.authors) && book.authors.length > 0
              && <p className="p2">{book.authors.join(', ')}</p>}
            <p className="p2">{`ISBN: ${book.ISBN}`}</p>
          </div>
        </a>

        <div
          className="likedBook-trashCan"
          onClick={() => setIndexToDelete(index)}
          title={i18n.t('delete')}
        >
          <TrashCan />
        </div>

        {indexToDelete === index && (
          <div className="likedBook-deletion">
            <p>{i18n.t('questionBookDeletion')}</p>
            <div>
              <CancelButton onClick={() => setIndexToDelete(null)} />
              <DeleteButton onClick={() => handleDeletion(book)} />
            </div>
          </div>
        )}
      </div>
    ))
  );
}

export default ListOfLikes;
