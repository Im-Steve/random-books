import React, { useEffect, useState } from 'react';

import ActionButtons from '../../components/ActionButtons/ActionButtons';
import BookCard from '../../components/BookCard/BookCard';
import BooksNavbar from '../../components/BooksNavbar/BooksNavbar';
import getUrlFilterParams from '../../func/getUrlFilterParams';
import NoResult from '../../components/NoResult/NoResult';
import { addFeaturedContent, searchBooks, shuffleBooks } from '../../func/fetchBooks';
import './randomizer.css';

const windowHeight = window.innerHeight;

function Randomizer() {
  const filterParams = getUrlFilterParams();
  const isMobile = /Mobi/i.test(window.navigator.userAgent);

  const [bookCards, setBookCards] = useState([]);
  const [bookIndex, setBookIndex] = useState(0);
  const [disabledActions, setDisabledActions] = useState(false);
  const [slidingLeft, setSlidingLeft] = useState(false);
  const [slidingRight, setSlidingRight] = useState(false);

  const [descHeightNext, setDescHeightNext] = useState(null);
  const [descHeightPrev, setDescHeightPrev] = useState(null);
  let descHeightOnHold = null;
  const [descHeightInFront, setDescHeightInFront] = useState(null);
  const [bioHeightNext, setBioHeightNext] = useState(null);
  const [bioHeightPrev, setBioHeightPrev] = useState(null);
  let bioHeightOnHold = null;
  const [bioHeightInFront, setBioHeightInFront] = useState(null);

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
        component: <NoResult textName={shuffledBooks.length === 0 ? 'Search' : 'Sliding'} />,
      });

      setBookCards(bookBundle);
    };

    fetchData();
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
        setSlidingLeft(true);
      }, window.scrollY > 0 ? 1000 : 500);

      setTimeout(() => {
        setSlidingLeft(false);
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
        setSlidingLeft(true);
      }, window.scrollY > 0 ? 500 : 0);

      setTimeout(() => {
        setSlidingLeft(false);
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
        setSlidingRight(true);
      }, window.scrollY > 0 ? 500 : 0);

      setTimeout(() => {
        setSlidingRight(false);
        setDescHeightInFront(descHeightOnHold);
        setBioHeightInFront(bioHeightOnHold);
        setBookIndex(bookIndex - 1);
        setDisabledActions(false);
      }, window.scrollY > 0 ? 1000 : 500);
    }
  }

  return (
    <>
      {Array.isArray(bookCards) && bookCards.length > 0 && (
        <>
          {bookIndex > 0 && (
            <>
              {bookCards[bookIndex - 1].mediaType === 'book' && (
                <BookCard
                  book={bookCards[bookIndex - 1]}
                  key={bookCards[bookIndex - 1].ISBN}
                  className={`slidingBook-left ${slidingRight ? 'slidingBook-left-to-center' : ''}`}
                  windowHeight={isMobile ? windowHeight : null}
                  onHold
                  onDescResize={(height) => setDescHeightPrev(height)}
                  onBioResize={(height) => setBioHeightPrev(height)}
                />
              )}
              {bookCards[bookIndex - 1].mediaType !== 'book' && (
                <div className={`slidingBook-media slidingBook-left ${slidingRight ? 'slidingBook-left-to-center' : ''}`}>
                  {bookCards[bookIndex - 1].component}
                </div>
              )}
            </>
          )}

          <>
            {bookCards[bookIndex].mediaType === 'book' && (
              <BookCard
                book={bookCards[bookIndex]}
                key={bookCards[bookIndex].ISBN}
                className={`slidingBook-center ${slidingLeft ? 'slidingBook-center-to-left' : ''} ${slidingRight ? 'slidingBook-center-to-right' : ''}`}
                windowHeight={isMobile ? windowHeight : null}
                onHold={false}
                descHeight={descHeightInFront}
                bioHeight={bioHeightInFront}
              />
            )}
            {bookCards[bookIndex].mediaType !== 'book' && (
              <div className={`slidingBook-media slidingBook-center ${slidingLeft ? 'slidingBook-center-to-left' : ''} ${slidingRight ? 'slidingBook-center-to-right' : ''}`}>
                {bookCards[bookIndex].component}
              </div>
            )}
          </>

          {bookIndex < bookCards.length - 1 && (
            <>
              {bookCards[bookIndex + 1].mediaType === 'book' && (
                <BookCard
                  book={bookCards[bookIndex + 1]}
                  key={bookCards[bookIndex + 1].ISBN}
                  className={`slidingBook-right ${slidingLeft ? 'slidingBook-right-to-center' : ''}`}
                  windowHeight={isMobile ? windowHeight : null}
                  onHold
                  onDescResize={(height) => setDescHeightNext(height)}
                  onBioResize={(height) => setBioHeightNext(height)}
                />
              )}
              {bookCards[bookIndex + 1].mediaType !== 'book' && (
                <div className={`slidingBook-media slidingBook-right ${slidingLeft ? 'slidingBook-right-to-center' : ''}`}>
                  {bookCards[bookIndex + 1].component}
                </div>
              )}
            </>
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

      <BooksNavbar left="options" right="likes" />
    </>
  );
}

export default Randomizer;
