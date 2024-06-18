import React, { useEffect, useState } from 'react';

import ActionButtons from '../../components/ActionButtons/ActionButtons';
import { addFeaturedContent, searchBooks, shuffleBooks } from '../../func/fetchBooks';
import BookCard from '../../components/BookCard/BookCard';
import BooksNavbar from '../../components/BooksNavbar/BooksNavbar';
import getUrlFilterParams from '../../func/getUrlFilterParams';
import { getWindowHeight, getWindowWidth, isMobile } from '../../func/getWindowData';
import { NAVBAR_HEIGHT } from '../../constants';
import NoResult from '../../components/NoResult/NoResult';
import PageLoading from '../../components/PageLoading/PageLoading';
import './randomizer.css';

function Randomizer() {
  const filterParams = getUrlFilterParams();

  let windowH = getWindowHeight();
  let windowW = getWindowWidth();
  const [windowHeight, setWindowHeight] = useState(getWindowHeight());
  const [heightForCover, setHeightForCover] = useState(getWindowHeight());

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

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await searchBooks(filterParams);
      const shuffledBooks = shuffleBooks(data);

      let bookBundle = [];
      shuffledBooks.forEach((book) => {
        bookBundle.push({ ...book, mediaType: 'book' });
      });
      bookBundle = await addFeaturedContent(bookBundle);
      bookBundle.push({
        mediaType: 'component',
        component: <NoResult messageType={shuffledBooks.length === 0 ? 'Search' : 'Sliding'} />,
      });

      setBookCards(bookBundle);
    };

    function handleResize() {
      setWindowHeight(getWindowHeight());
      if (!isMobile()) {
        setHeightForCover(getWindowHeight());
      }
    }

    function handleOrientationChange() {
      const windowHCopy = windowH;
      const windowWCopy = windowW;
      windowH = windowWCopy;
      windowW = windowHCopy;
      setWindowHeight(getWindowHeight());
      setHeightForCover(windowH);
    }

    fetchData();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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
        setBookIndex(bookIndex - 1);
        setDisabledActions(false);
      }, window.scrollY > 0 ? 1000 : 500);
    }
  }

  return (
    <>
      {(!Array.isArray(bookCards) || bookCards.length === 0) && (
        <PageLoading />
      )}
      {Array.isArray(bookCards) && bookCards.length > 0 && (
        <>
          {bookIndex > 0 && (
            <div
              className={`slidingBook-left ${slidingToRight ? 'slidingBook-left-to-center' : ''}`}
              style={{ minHeight: `${windowHeight - NAVBAR_HEIGHT}px` }}
            >
              {bookCards[bookIndex - 1].mediaType === 'book' ? (
                <BookCard
                  book={bookCards[bookIndex - 1]}
                  key={bookCards[bookIndex - 1].ISBN}
                  heightForCover={isMobile() ? heightForCover : null}
                  onHold
                  onDescResize={(height) => setDescHeightPrev(height)}
                  onBioResize={(height) => setBioHeightPrev(height)}
                />
              ) : (
                <div className="slidingBook-media">
                  {bookCards[bookIndex - 1].component}
                </div>
              )}
            </div>
          )}

          <div
            className={`slidingBook-center ${slidingToLeft ? 'slidingBook-center-to-left' : ''} ${slidingToRight ? 'slidingBook-center-to-right' : ''}`}
            style={{ minHeight: `${windowHeight - NAVBAR_HEIGHT}px` }}
          >
            {bookCards[bookIndex].mediaType === 'book' ? (
              <BookCard
                book={bookCards[bookIndex]}
                key={bookCards[bookIndex].ISBN}
                heightForCover={isMobile() ? heightForCover : null}
                onHold={false}
                descHeight={descHeightInFront}
                bioHeight={bioHeightInFront}
              />
            ) : (
              <div className="slidingBook-media">
                {bookCards[bookIndex].component}
              </div>
            )}
          </div>

          {bookIndex < bookCards.length - 1 && (
            <div
              className={`slidingBook-right ${slidingToLeft ? 'slidingBook-right-to-center' : ''}`}
              style={{ minHeight: `${windowHeight - NAVBAR_HEIGHT}px` }}
            >
              {bookCards[bookIndex + 1].mediaType === 'book' ? (
                <BookCard
                  book={bookCards[bookIndex + 1]}
                  key={bookCards[bookIndex + 1].ISBN}
                  heightForCover={isMobile() ? heightForCover : null}
                  onHold
                  onDescResize={(height) => setDescHeightNext(height)}
                  onBioResize={(height) => setBioHeightNext(height)}
                />
              ) : (
                <div className="slidingBook-media">
                  {bookCards[bookIndex + 1].component}
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
          />
        </>
      )}

      <BooksNavbar left="filter" right="likes" />
    </>
  );
}

export default Randomizer;
