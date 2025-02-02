import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AdultModal from '../AdultModal/AdultModal';
import Gallery from '../Gallery/Gallery';
import { getBookCoverSrc } from '../../func/getExternalSrc';
import { getBookUrl, getCollectionUrl, getSeriesUrl } from '../../func/getInternalUrl';
import { getDisplayAdultContent } from '../../func/handleSessionStorage';
import isAdultContent from '../../func/isAdultContent';
import MiniCensoredImage from '../CensoredImage/MiniCensoredImage';
import {
  searchBooks,
  shuffleBooks,
  sortBooksAlphabetically,
  sortSeries,
} from '../../func/fetchBooks';
import './bookCard.css';

function SeriesSection({ book = {}, allBooksInTheCategory }) {
  const { t } = useTranslation();

  const [isForSeries, setIsForSeries] = useState(!!book.seriesCode);
  const [isForCollection, setIsForCollection] = useState(
    !book.seriesCode && book.publisher && book.collection,
  );

  const [displayAdultContent, setDisplayAdultContent] = useState(getDisplayAdultContent());
  const [limitedSeriesBooks, setLimitedSeriesBooks] = useState([]);
  const [nbSeriesBooks, setNbSeriesBooks] = useState(0);
  const [openAdultModal, setOpenAdultModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (book.seriesCode || (book.publisher && book.collection)) {
        let sortedBooks = [];
        let nbBooks = 0;
        let topBooks = [];

        const { data } = await searchBooks({
          booksProp: allBooksInTheCategory,
          mainCategory: Array.isArray(book.mainCategories) && book.mainCategories[0],
          seriesCode: book.seriesCode || null,
          publisher: !book.seriesCode && book.collection ? book.publisher : null,
          collection: !book.seriesCode && book.publisher ? book.collection : null,
          language: book.language,
        });

        if (Array.isArray(data) && data.length > 0) {
          sortedBooks = sortSeries(data);

          if (isForCollection) {
            if (typeof book.language === 'string'
            && book.language.toLowerCase().includes('fr')
            && sortedBooks.length > 10) {
              sortedBooks = shuffleBooks(sortedBooks);
            } else {
              sortedBooks = sortBooksAlphabetically(sortedBooks);
            }
          }

          nbBooks = sortedBooks.length;
          topBooks = sortedBooks.slice(0, 10);
        }

        setNbSeriesBooks(nbBooks);
        setLimitedSeriesBooks(topBooks);
      }
    };

    function handleStorageChange() {
      setDisplayAdultContent(getDisplayAdultContent());
    }

    fetchData();
    setIsForSeries(!!book.seriesCode);
    setIsForCollection(!book.seriesCode && book.publisher && book.collection);

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [book]);

  function getPageLink() {
    if (isForSeries) {
      return getSeriesUrl(book);
    }
    if (isForCollection) {
      return getCollectionUrl(book);
    }
    return '/404';
  }

  return (
    Array.isArray(limitedSeriesBooks) && limitedSeriesBooks.length > 0 && (
      <>
        <div className="section section-highlighted">
          <div className="bookCard-series-header">
            {isForSeries && (<p title={book.seriesName}>{`${t('bookHeaderSeries')}: ${book.seriesName} `}</p>)}
            {isForCollection && (<p title={book.collection}>{`${t('bookHeaderCollection')}: ${book.collection} `}</p>)}
            <Link to={getPageLink()}>
              {isForSeries && `(${t('seeAll')})`}
              {isForCollection && `(${t('seeBrowse')})`}
            </Link>
          </div>

          <Gallery>
            <>
              {limitedSeriesBooks.map((seriesBook) => (
                isAdultContent(seriesBook) && !displayAdultContent ? (
                  <div className="bookCard-thumbnail-adult gallery-img" key={seriesBook.id || seriesBook.ISBN}>
                    <MiniCensoredImage onClick={() => setOpenAdultModal(true)} />
                  </div>
                ) : (
                  <Link
                    className="gallery-img"
                    to={getBookUrl(seriesBook)}
                    key={seriesBook.id || seriesBook.ISBN}
                  >
                    <img
                      className="bookCard-thumbnail"
                      src={getBookCoverSrc(seriesBook.cover)}
                      alt="series-book-cover"
                      title={seriesBook.title}
                    />
                  </Link>
                )
              ))}
              {nbSeriesBooks > 10 && (
                <div className="bookCard-series-end">
                  <div>
                    <Link to={getPageLink()}>
                      {isForSeries && t('seeAll')}
                      {isForCollection && t('seeBrowse')}
                    </Link>
                  </div>
                </div>
              )}
            </>
          </Gallery>
        </div>

        {openAdultModal && (
          <AdultModal onClose={() => setOpenAdultModal(false)} />
        )}
      </>
    )
  );
}

SeriesSection.propTypes = {
  book: PropTypes.shape({
    seriesCode: PropTypes.string,
    seriesName: PropTypes.string,
    publisher: PropTypes.string,
    collection: PropTypes.string,
  }).isRequired,
  allBooksInTheCategory: PropTypes.arrayOf(PropTypes.shape()),
};

export default SeriesSection;
