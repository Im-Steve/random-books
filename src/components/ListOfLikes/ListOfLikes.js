import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CloseMiniButton from '../Buttons/CloseMiniButton';
import DeleteMiniButton from '../Buttons/DeleteMiniButton';
import { getBookCoverSrc } from '../../func/getExternalSrc';
import { getBookUrl } from '../../func/getInternalUrl';
import { getDisplayAdultContent } from '../../func/handleSessionStorage';
import { getSortedLikedBooks, removeOneLikedBook } from '../../func/handleLocalStorage';
import isAdultContent from '../../func/isAdultContent';
import MiniCensoredImage from '../CensoredImage/MiniCensoredImage';
import { TrashCan } from '../../assets/Icons';
import './listOfLikes.css';

const LIMIT_OF_BOOKS_FOR_TAB = 25;

function ListOfLikes({
  onGoBook = () => {},
  forTab = false,
  isVisible = true,
}) {
  const { t } = useTranslation();

  const [displayAdultContent, setDisplayAdultContent] = useState(getDisplayAdultContent());
  const [likedBooks, setLikedBooks] = useState([]);
  const [nbLikedBooks, setNbLikedBooks] = useState(0);
  const [indexToDelete, setIndexToDelete] = useState(null);

  useEffect(() => {
    setIndexToDelete(null);

    function handleStorageChange() {
      let storedLikedBooks = getSortedLikedBooks();

      if (Array.isArray(likedBooks)) {
        const nbBooks = storedLikedBooks.length;
        if (forTab && nbBooks > LIMIT_OF_BOOKS_FOR_TAB) {
          storedLikedBooks = storedLikedBooks.slice(0, LIMIT_OF_BOOKS_FOR_TAB);
        }
        setLikedBooks(storedLikedBooks);
        setNbLikedBooks(nbBooks);
      }

      setDisplayAdultContent(getDisplayAdultContent());
    }

    if (isVisible) {
      handleStorageChange();
      window.addEventListener('storage', handleStorageChange);
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isVisible]);

  function handleDeletion(book) {
    removeOneLikedBook(book);
    setIndexToDelete(null);
  }

  function onClickBook(book) {
    if (Array.isArray(book.mainCategories) && book.mainCategories[0].toLowerCase() === 'wattpad') {
      return;
    }
    onGoBook();
  }

  function renderOneBook(book, index) {
    return (
      <div className="likedBook-container" key={`${index}-${book.id || book.ISBN}`}>
        <Link
          className="likedBook"
          to={Array.isArray(book.mainCategories) && book.mainCategories[0].toLowerCase() === 'wattpad' ? `https://www.wattpad.com/story/${book.id || book.ISBN}` : getBookUrl(book)}
          target={Array.isArray(book.mainCategories) && book.mainCategories[0].toLowerCase() === 'wattpad' ? '_blank' : ''}
          rel={Array.isArray(book.mainCategories) && book.mainCategories[0].toLowerCase() === 'wattpad' ? 'noreferrer' : ''}
          onClick={() => onClickBook(book)}
        >
          <p className="likedBook-index">{index + 1}</p>

          {isAdultContent(book) && !displayAdultContent ? (
            <div className="likedBook-cover">
              <MiniCensoredImage />
            </div>
          ) : (
            <img
              className="likedBook-cover"
              src={getBookCoverSrc(book.cover)}
              alt="cover"
            />
          )}

          <div className="likedBook-info">
            {book.title && <p title={book.title}>{book.title}</p>}
            {Array.isArray(book.authors) && book.authors.length > 0
              && <p className="p2" title={book.authors.join(', ')}>{book.authors.join(', ')}</p>}
            {Array.isArray(book.mainCategories) && book.mainCategories.join().toLowerCase().includes('wattpad')
              ? <p className="p2">{t('generalWattpadBook')}</p>
              : <p className="p2" title={book.ISBN}>{`ISBN: ${book.ISBN}`}</p>}
          </div>
        </Link>

        <div
          className="likedBook-trashCan"
          onClick={() => setIndexToDelete(index)}
          title={t('buttonDelete')}
        >
          <TrashCan />
        </div>

        {indexToDelete === index && (
          <div className="likedBook-deletion">
            <p>{t('likesQuestionDeletion')}</p>
            <div>
              <CloseMiniButton onClick={() => setIndexToDelete(null)} text={t('buttonCancel')} />
              <DeleteMiniButton onClick={() => handleDeletion(book)} />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {likedBooks.map((book, index) => (
        forTab
          ? renderOneBook(book, index)
          : (
            <LazyLoad key={`${index}-${book.id || book.ISBN}`} height={125} offset={800}>
              {renderOneBook(book, index)}
            </LazyLoad>
          )
      ))}

      {forTab && nbLikedBooks > LIMIT_OF_BOOKS_FOR_TAB && (
        <div className="likedBook-end">
          <Link to="/likes">
            {t('seeAll')}
          </Link>
        </div>
      )}
    </>
  );
}

ListOfLikes.propTypes = {
  onGoBook: PropTypes.func,
  forTab: PropTypes.bool,
  isVisible: PropTypes.bool,
};

export default ListOfLikes;
