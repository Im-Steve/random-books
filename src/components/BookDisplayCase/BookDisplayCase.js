import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AdultModal from '../AdultModal/AdultModal';
import BackButton from '../Buttons/BackButton';
import BooksNavbar from '../BooksNavbar/BooksNavbar';
import Footer from '../Footer/Footer';
import { getBookCoverSrc } from '../../func/getExternalSrc';
import { getBookUrl } from '../../func/getInternalUrl';
import { getDisplayAdultContent } from '../../func/handleSessionStorage';
// import {
//   getIsPortrait,
//   getWindowHeight,
//   getWindowWidth,
//   isMobile,
// } from '../../func/getWindowData';
// import { imgBgSeriesLandscape, imgBgSeriesPortrait } from '../../assets/Images';
import isAdultContent from '../../func/isAdultContent';
import MiniCensoredImage from '../CensoredImage/MiniCensoredImage';
import './bookDisplayCase.css';

function BookDisplayCase({
  books = [],
  isForSeries,
  seriesName,
  isForCollection,
  collection,
  publisher,
}) {
  const { t } = useTranslation();

  // let currentWindowHeight = getWindowHeight();
  // let currentWindowWidth = getWindowWidth();

  const [displayAdultContent, setDisplayAdultContent] = useState(getDisplayAdultContent());
  // const [fixedWindowHeight, setFixedWindowHeight] = useState(getWindowHeight());
  // const [isPortrait, setIsPortrait] = useState(getIsPortrait());
  const [openAdultModal, setOpenAdultModal] = useState(false);

  useEffect(() => {
    // function handleResize() {
    //   if (!isMobile()) {
    //     setFixedWindowHeight(getWindowHeight());
    //   }
    //   setIsPortrait(getIsPortrait());
    // }

    // function handleOrientationChange() {
    //   const windowHeightCopy = currentWindowHeight;
    //   const windowWidthCopy = currentWindowWidth;
    //   currentWindowHeight = windowWidthCopy;
    //   currentWindowWidth = windowHeightCopy;
    //   setFixedWindowHeight(currentWindowHeight);
    //   setIsPortrait(getIsPortrait());
    // }

    function handleStorageChange() {
      setDisplayAdultContent(getDisplayAdultContent());
    }

    // window.addEventListener('resize', handleResize);
    // window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      // window.removeEventListener('resize', handleResize);
      // window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  function onClickAdultCover(event) {
    setOpenAdultModal(true);
    event.stopPropagation();
  }

  // function getBackgroundHeight() {
  //   if (!isMobile()) {
  //     return fixedWindowHeight;
  //   }
  //   return `${fixedWindowHeight + 250}px`;
  // }

  return (
    <>
      <BooksNavbar left="home" right="likes" />

      {/* <div
        className="bookDisplayCase-bg"
        style={{
          backgroundImage: isPortrait
            ? `url('${imgBgSeriesPortrait}')`
            : `url('${imgBgSeriesLandscape}')`,
          height: getBackgroundHeight(),
        }}
      /> */}

      <div className="bookDisplayCase">
        <div className="panel">
          <BackButton mode="light" className="button-back-panel" />

          <div className="section-header section-highlighted">
            {isForSeries && (
              <>
                <h2>{t('pageSeriesHeader')}</h2>
                <h1>{seriesName}</h1>
              </>
            )}

            {isForCollection && (
              <>
                <h2>{t('pageCollectionHeader1')}</h2>
                <h1>{collection}</h1>
                <p>{`${t('pageCollectionHeader2')}${publisher}`}</p>
              </>
            )}
          </div>

          <div className="bookDisplayCase-content">
            <div className="section">

              {books.map((book) => (
                <LazyLoad key={book.id || book.ISBN} height={200} offset={200}>
                  <div className="bookDisplayCase-case">
                    {isAdultContent(book) && !displayAdultContent ? (
                      <div className="bookDisplayCase-cover-adult">
                        <MiniCensoredImage onClick={(e) => onClickAdultCover(e)} />
                      </div>
                    ) : (
                      <Link to={getBookUrl(book)}>
                        <img
                          className="bookDisplayCase-cover"
                          src={getBookCoverSrc(book.cover)}
                          alt="book-cover"
                        />
                      </Link>
                    )}

                    <Link
                      className="bookDisplayCase-book-title"
                      to={getBookUrl(book)}
                      title={book.title}
                    >
                      {book.title}
                    </Link>

                    {Array.isArray(book.authors) && book.authors.length > 0 && (
                      <Link
                        className="bookDisplayCase-book-authors"
                        to={getBookUrl(book)}
                        title={book.authors.join(', ')}
                      >
                        {book.authors.join(', ')}
                      </Link>
                    )}
                  </div>
                </LazyLoad>
              ))}

            </div>
          </div>

          <Footer />
        </div>
      </div>

      {openAdultModal && (
        <AdultModal onClose={() => setOpenAdultModal(false)} />
      )}
    </>
  );
}

BookDisplayCase.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isForSeries: PropTypes.bool,
  seriesName: PropTypes.string,
  isForCollection: PropTypes.bool,
  collection: PropTypes.string,
  publisher: PropTypes.string,
};

export default BookDisplayCase;
