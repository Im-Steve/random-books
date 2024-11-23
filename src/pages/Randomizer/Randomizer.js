import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ActionButtons from '../../components/ActionButtons/ActionButtons';
import {
  addFeaturedContent,
  searchBooks,
  shuffleBooks,
  sortBooksByNewest,
} from '../../func/fetchBooks';
import AdMedia from '../../components/AdMedia/AdMedia';
import BookCard from '../../components/BookCard/BookCard';
import BooksNavbar from '../../components/BooksNavbar/BooksNavbar';
import { FAKE_LOADING_TIME, FAKE_SAFARI_TIME, NAVBAR_HEIGHT } from '../../constants';
import { getTutorialDone } from '../../func/handleLocalStorage';
import getUrlFilterParams from '../../func/getUrlFilterParams';
import { getWindowHeight, getWindowWidth, isMobile } from '../../func/getWindowData';
import isSafari from '../../func/isSafari';
import NoResult from '../../components/NoResult/NoResult';
import PageLoading from '../../components/PageLoading/PageLoading';
import { sendPageViewGA } from '../../analytics';
import TigerEgg from '../../components/TigerEgg/TigerEgg';
import TutorialOverlay from '../../components/TutorialOverlay/TutorialOverlay';
import './randomizer.css';

function Randomizer() {
  sendPageViewGA();
  const location = useLocation();

  let currentWindowHeight;
  let currentWindowWidth;

  const filterParams = getUrlFilterParams();

  const [fakeLoading, setFakeLoading] = useState(true);

  const [windowHeight, setWindowHeight] = useState(getWindowHeight());
  const [windowHeightForCover, setWindowHeightForCover] = useState(0);

  const [allBooksInTheCategory, setAllBooksInTheCategory] = useState([]);
  const [bookCards, setBookCards] = useState([]);
  const [bookIndex, setBookIndex] = useState(0);
  const [disabledActions, setDisabledActions] = useState(false);
  const [slidingToLeft, setSlidingToLeft] = useState(false);
  const [slidingToRight, setSlidingToRight] = useState(false);

  const [descHeightInFront, setDescHeightInFront] = useState(null);
  const [descHeightPrev, setDescHeightPrev] = useState(null);
  const [descHeightNext, setDescHeightNext] = useState(null);
  let descHeightOnHold = null;
  const [bioHeightInFront, setBioHeightInFront] = useState(null);
  const [bioHeightPrev, setBioHeightPrev] = useState(null);
  const [bioHeightNext, setBioHeightNext] = useState(null);
  let bioHeightOnHold = null;

  const [showTutorial, setShowTutorial] = useState(!getTutorialDone());
  const [nbOfReturns, setNbOfReturns] = useState(0);

  function scrollToTop() {
    if (isSafari()) {
      window.scrollTo({ top: -50, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  useEffect(() => {
    const refreshTimer = setTimeout(() => {
      setFakeLoading(true);
      setBookCards([]);
      setBookIndex(0);
      setNbOfReturns(0);
    }, 100);

    const fakeLoadingTimer = setTimeout(() => {
      setFakeLoading(false);

      currentWindowHeight = getWindowHeight();
      currentWindowWidth = getWindowWidth();
      setWindowHeightForCover(getWindowHeight());
    }, !isSafari() ? FAKE_LOADING_TIME : FAKE_SAFARI_TIME);

    const fetchData = async () => {
      const { data, unfilteredData } = await searchBooks(filterParams);
      setAllBooksInTheCategory(unfilteredData);

      let shuffledBooks = [];
      let bookBundle = [];
      if (filterParams.sortByNewest) {
        shuffledBooks = sortBooksByNewest(data);
      } else {
        shuffledBooks = shuffleBooks(data);
      }
      shuffledBooks.forEach((book) => {
        bookBundle.push({ ...book, type: 'book' });
      });
      bookBundle = await addFeaturedContent(bookBundle);
      bookBundle.push({
        type: 'component',
        component: NoResult,
      });

      setBookCards(bookBundle);
    };

    function handleResize() {
      setWindowHeight(getWindowHeight());
      if (!isMobile()) {
        setWindowHeightForCover(getWindowHeight());
      }
    }

    function handleOrientationChange() {
      const windowHeightCopy = currentWindowHeight;
      const windowWidthCopy = currentWindowWidth;
      currentWindowHeight = windowWidthCopy;
      currentWindowWidth = windowHeightCopy;
      setWindowHeight(currentWindowHeight);
      setWindowHeightForCover(currentWindowHeight);
    }

    function handleStorageChange() {
      setShowTutorial(!getTutorialDone());
    }

    const fetchTimer = setTimeout(() => {
      fetchData();
    }, 500);

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearTimeout(refreshTimer);
      clearTimeout(fakeLoadingTimer);
      clearTimeout(fetchTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [location]);

  function handleLike() {
    if (bookCards.length > bookIndex + 1) {
      setDisabledActions(true);
      descHeightOnHold = descHeightNext;
      bioHeightOnHold = bioHeightNext;

      setTimeout(() => {
        scrollToTop();
      }, 500);

      setTimeout(() => {
        setSlidingToLeft(true);
      }, window.scrollY > 0 ? 1000 : 500);

      setTimeout(() => {
        setSlidingToLeft(false);
        setDescHeightInFront(descHeightOnHold);
        setBioHeightInFront(bioHeightOnHold);
        setBookIndex(bookIndex + 1);
        setDisabledActions(false);
      }, window.scrollY > 0 ? 1500 : 1000);
    }

    setNbOfReturns(0);
  }

  function handleDislike() {
    if (bookCards.length > bookIndex + 1) {
      setDisabledActions(true);
      descHeightOnHold = descHeightNext;
      bioHeightOnHold = bioHeightNext;

      scrollToTop();

      setTimeout(() => {
        setSlidingToLeft(true);
      }, window.scrollY > 0 ? 500 : 0);

      setTimeout(() => {
        setSlidingToLeft(false);
        setDescHeightInFront(descHeightOnHold);
        setBioHeightInFront(bioHeightOnHold);
        setBookIndex(bookIndex + 1);
        setDisabledActions(false);
      }, window.scrollY > 0 ? 1000 : 500);
    }

    setNbOfReturns(0);
  }

  function handleBack() {
    if (bookIndex > 0) {
      setDisabledActions(true);
      descHeightOnHold = descHeightPrev;
      bioHeightOnHold = bioHeightPrev;

      scrollToTop();

      setTimeout(() => {
        setSlidingToRight(true);
      }, window.scrollY > 0 ? 500 : 0);

      setTimeout(() => {
        setSlidingToRight(false);
        setDescHeightInFront(descHeightOnHold);
        setBioHeightInFront(bioHeightOnHold);
        setDisabledActions(false);

        if (nbOfReturns + 1 === 7 && bookIndex - 1 === 0 && bookCards[0].type !== 'component') {
          bookCards.unshift({ type: 'component', component: TigerEgg });
        } else {
          setBookIndex(bookIndex - 1);
        }
      }, window.scrollY > 0 ? 1000 : 500);
    }

    setNbOfReturns(nbOfReturns + 1);
  }

  return (
    <>
      <BooksNavbar
        left="filter"
        right="likes"
        showTutorial={
          !fakeLoading
          && Array.isArray(bookCards)
          && bookCards.length > 1
          && showTutorial
        }
      />

      {(fakeLoading || !Array.isArray(bookCards) || bookCards.length === 0) && (
        <PageLoading />
      )}

      {!fakeLoading && Array.isArray(bookCards) && bookCards.length > 0 && (
        <>
          {showTutorial && bookCards.length > 1 && <TutorialOverlay />}

          {bookIndex > 0 && bookCards[bookIndex - 1] && (
            <div
              className={`slidingBook-left ${slidingToRight ? 'slidingBook-left-to-center' : ''}`}
              style={{ minHeight: `${windowHeight - NAVBAR_HEIGHT}px` }}
            >
              {bookCards[bookIndex - 1].type === 'book' && (
                <BookCard
                  book={bookCards[bookIndex - 1]}
                  key={bookCards[bookIndex - 1].id || bookCards[bookIndex - 1].ISBN}
                  windowHeightForCover={isMobile() ? windowHeightForCover : null}
                  onHold
                  onDescResize={(height) => setDescHeightPrev(height)}
                  onBioResize={(height) => setBioHeightPrev(height)}
                />
              )}
              {bookCards[bookIndex - 1].type === 'component' && (
                <div
                  className="slidingBook-media"
                  style={{ height: `${isMobile() ? windowHeightForCover - NAVBAR_HEIGHT : windowHeight - NAVBAR_HEIGHT}px` }}
                >
                  {React.createElement(
                    bookCards[bookIndex - 1].component,
                    {
                      messageType: bookCards.length === 1 ? 'Search' : 'Sliding',
                      onHold: true,
                    },
                  )}
                </div>
              )}
              {['image', 'video'].includes(bookCards[bookIndex - 1].type) && (
                <div className="slidingBook-media">
                  <AdMedia
                    media={bookCards[bookIndex - 1]}
                    height={`${isMobile() ? windowHeightForCover - NAVBAR_HEIGHT : windowHeight - NAVBAR_HEIGHT}px`}
                    onHold
                  />
                </div>
              )}
            </div>
          )}

          {bookCards[bookIndex] && (
            <div
              className={`slidingBook-center ${slidingToLeft ? 'slidingBook-center-to-left' : ''} ${slidingToRight ? 'slidingBook-center-to-right' : ''}`}
              style={{ minHeight: `${windowHeight - NAVBAR_HEIGHT}px` }}
            >
              {bookCards[bookIndex].type === 'book' && (
                <BookCard
                  book={bookCards[bookIndex]}
                  key={bookCards[bookIndex].id || bookCards[bookIndex].ISBN}
                  windowHeightForCover={isMobile() ? windowHeightForCover : null}
                  onHold={false}
                  descHeight={descHeightInFront}
                  bioHeight={bioHeightInFront}
                  allBooksInTheCategory={allBooksInTheCategory}
                />
              )}
              {bookCards[bookIndex].type === 'component' && (
                <div
                  className="slidingBook-media"
                  style={{ height: `${isMobile() ? windowHeightForCover - NAVBAR_HEIGHT : windowHeight - NAVBAR_HEIGHT}px` }}
                >
                  {React.createElement(
                    bookCards[bookIndex].component,
                    {
                      messageType: bookCards.length === 1 ? 'Search' : 'Sliding',
                      onHold: false,
                    },
                  )}
                </div>
              )}
              {['image', 'video'].includes(bookCards[bookIndex].type) && (
                <div className="slidingBook-media">
                  <AdMedia
                    media={bookCards[bookIndex]}
                    height={`${isMobile() ? windowHeightForCover - NAVBAR_HEIGHT : windowHeight - NAVBAR_HEIGHT}px`}
                    onHold={slidingToLeft || slidingToRight}
                  />
                </div>
              )}
            </div>
          )}

          {bookIndex < bookCards.length - 1 && bookCards[bookIndex + 1] && (
            <div
              className={`slidingBook-right ${slidingToLeft ? 'slidingBook-right-to-center' : ''}`}
              style={{ minHeight: `${windowHeight - NAVBAR_HEIGHT}px` }}
            >
              {bookCards[bookIndex + 1].type === 'book' && (
                <BookCard
                  book={bookCards[bookIndex + 1]}
                  key={bookCards[bookIndex + 1].id || bookCards[bookIndex + 1].ISBN}
                  windowHeightForCover={isMobile() ? windowHeightForCover : null}
                  onHold
                  onDescResize={(height) => setDescHeightNext(height)}
                  onBioResize={(height) => setBioHeightNext(height)}
                />
              )}
              {bookCards[bookIndex + 1].type === 'component' && (
                <div
                  className="slidingBook-media"
                  style={{ height: `${isMobile() ? windowHeightForCover - NAVBAR_HEIGHT : windowHeight - NAVBAR_HEIGHT}px` }}
                >
                  {React.createElement(
                    bookCards[bookIndex + 1].component,
                    {
                      messageType: bookCards.length === 1 ? 'Search' : 'Sliding',
                      onHold: true,
                    },
                  )}
                </div>
              )}
              {['image', 'video'].includes(bookCards[bookIndex + 1].type) && (
                <div className="slidingBook-media">
                  <AdMedia
                    media={bookCards[bookIndex + 1]}
                    height={`${isMobile() ? windowHeightForCover - NAVBAR_HEIGHT : windowHeight - NAVBAR_HEIGHT}px`}
                    onHold
                  />
                </div>
              )}
            </div>
          )}

          <ActionButtons
            firstItem={bookIndex === 0}
            lastItem={bookIndex === bookCards.length - 1}
            onLike={() => handleLike()}
            onDislike={() => handleDislike()}
            onBack={() => handleBack()}
            book={bookCards[bookIndex]}
            disabledActions={disabledActions}
            showTutorial={showTutorial && bookCards.length > 1}
          />
        </>
      )}
    </>
  );
}

export default Randomizer;
