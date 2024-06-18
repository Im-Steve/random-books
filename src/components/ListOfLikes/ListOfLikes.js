import React, { useEffect, useState } from 'react';

import CancelMiniButton from '../Buttons/CancelMiniButton';
import DeleteMiniButton from '../Buttons/DeleteMiniButton';
import { getArrayOfLikedBooks, removeOneLikedBook } from '../../func/handleLocalStorage';
import { getBookCoverSrc } from '../../func/getSrc';
import { getBookUrl } from '../../func/getUrl';
import { getDisplayAdultContent } from '../../func/handleSessionStorage';
import i18n from '../../i18n/i18n';
import { imgNoCover } from '../../assets/Images';
import isAdultContent from '../../func/isAdultContent';
import MiniAdultCover from '../AdultCover/MiniAdultCover';
import { TrashCan } from '../../assets/Icons';
import './listOfLikes.css';

function ListOfLikes() {
  const [displayAdultContent, setDisplayAdultContent] = useState(getDisplayAdultContent());
  const [likedBooks, setLikedBooks] = useState(getArrayOfLikedBooks());
  const [indexToDelete, setIndexToDelete] = useState(null);

  useEffect(() => {
    function handleStorageChange() {
      setLikedBooks(getArrayOfLikedBooks());
      setDisplayAdultContent(getDisplayAdultContent());
    }
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
        <a className="likedBook" href={getBookUrl(book)}>
          <p className="likedBook-index">{index + 1}</p>

          {isAdultContent(book) && !displayAdultContent ? (
            <div className="likedBook-cover">
              <MiniAdultCover />
            </div>
          ) : (
            <img
              className="likedBook-cover"
              src={book.cover ? getBookCoverSrc(book.cover) : imgNoCover}
              alt="cover"
            />
          )}

          <div className="likedBook-info">
            {book.title && <p title={book.title}>{book.title}</p>}
            {Array.isArray(book.authors) && book.authors.length > 0
              && <p className="p2" title={book.authors.join(', ')}>{book.authors.join(', ')}</p>}
            <p className="p2" title={book.ISBN}>{`ISBN: ${book.ISBN}`}</p>
          </div>
        </a>

        <div
          className="likedBook-trashCan"
          onClick={() => setIndexToDelete(index)}
          title={i18n.t('generalDelete')}
        >
          <TrashCan />
        </div>

        {indexToDelete === index && (
          <div className="likedBook-deletion">
            <p>{i18n.t('likesQuestionDeletion')}</p>
            <div>
              <CancelMiniButton onClick={() => setIndexToDelete(null)} />
              <DeleteMiniButton onClick={() => handleDeletion(book)} />
            </div>
          </div>
        )}
      </div>
    ))
  );
}

export default ListOfLikes;
