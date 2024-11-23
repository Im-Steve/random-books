import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AdultModal from '../AdultModal/AdultModal';
import CensoredImage from '../CensoredImage/CensoredImage';
import { getBookCoverSrc } from '../../func/getExternalSrc';
import { getDisplayAdultContent } from '../../func/handleSessionStorage';
import { getWindowHeight, getWindowWidth, isMobile } from '../../func/getWindowData';
import { imgBookSide, imgWoodenShelf } from '../../assets/Images';
import isAdultContent from '../../func/isAdultContent';
import './bookCard.css';

const COVER_PROPORTION = 0.68;

function CoverSection({ book = {}, windowHeightForCover = 0 }) {
  let windowHeight = getWindowHeight();
  let windowWidth = getWindowWidth();

  function handleMinCoverHeight(coverHeight) {
    return coverHeight > 300 ? coverHeight : 300; // also present in bookCard.css
  }

  const [coverHeight, setCoverHeight] = useState(handleMinCoverHeight(
    windowHeightForCover
      ? windowHeightForCover * COVER_PROPORTION
      : windowHeight * COVER_PROPORTION,
  ));
  const [displayAdultContent, setDisplayAdultContent] = useState(getDisplayAdultContent());
  const [openAdultModal, setOpenAdultModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setCoverHeight(handleMinCoverHeight(
      windowHeightForCover
        ? windowHeightForCover * COVER_PROPORTION
        : windowHeight * COVER_PROPORTION,
    ));

    function handleScroll() {
      const scrollThreshold = getWindowHeight() * 0.40;
      if (window.scrollY > scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    function handleResize() {
      if (!isMobile() && !windowHeightForCover) {
        setCoverHeight(handleMinCoverHeight(getWindowHeight() * COVER_PROPORTION));
      }
    }

    function handleOrientationChange() {
      if (!windowHeightForCover) {
        const windowHeightCopy = windowHeight;
        const windowWidthCopy = windowWidth;
        windowHeight = windowWidthCopy;
        windowWidth = windowHeightCopy;
        setCoverHeight(handleMinCoverHeight(windowHeight * COVER_PROPORTION));
      }
    }

    function handleStorageChange() {
      setDisplayAdultContent(getDisplayAdultContent());
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [windowHeightForCover]);

  return (
    <div className="bookCard-cover-container">
      <div
        className="bookCard-cover"
        style={{
          height: `${coverHeight}px`,
          transform: !scrolled ? '' : `perspective(4000px) rotateX(97deg) translateY(-${coverHeight / 2}px) translateZ(calc(-${coverHeight / 2}px + 15px))`,
        }}
      >
        {isAdultContent(book) && !displayAdultContent ? (
          <div
            className="bookCard-cover-top bookCard-cover-adult"
            style={{
              height: `${coverHeight}px`,
              width: `calc(${coverHeight}px * 0.65)`,
            }}
          >
            <CensoredImage onClick={() => setOpenAdultModal(true)} />
          </div>
        ) : (
          <div className="bookCard-cover-top">
            <img
              src={getBookCoverSrc(book.cover)}
              alt="book-top"
              style={{ filter: !scrolled ? 'brightness(1)' : 'brightness(0.7)' }}
            />
          </div>
        )}
        <img
          className="bookCard-cover-side"
          src={imgBookSide}
          alt="book-side"
          style={{ filter: scrolled ? 'brightness(1)' : 'brightness(0.5)' }}
        />
      </div>
      <img className="bookCard-woodenShelf" src={imgWoodenShelf} alt="wooden-shelf" />

      {openAdultModal && (
        <AdultModal onClose={() => setOpenAdultModal(false)} />
      )}
    </div>
  );
}

CoverSection.propTypes = {
  book: PropTypes.shape({
    cover: PropTypes.string,
  }).isRequired,
  windowHeightForCover: PropTypes.number,
};

export default CoverSection;
