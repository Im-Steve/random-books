import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AdultCover from '../AdultCover/AdultCover';
import AdultModal from '../AdultModal/AdultModal';
import { getBookCoverSrc } from '../../func/getSrc';
import { getDisplayAdultContent } from '../../func/handleSessionStorage';
import { getWindowHeight, getWindowWidth, isMobile } from '../../func/getWindowData';
import { imgBookSide, imgNoCover, imgWoodenShelf } from '../../assets/Images';
import isAdultContent from '../../func/isAdultContent';
import './bookCard.css';

const COVER_PROPORTION = 0.67;

function CoverSection({ book = {}, heightForCover = 0 }) {
  let windowHeight = getWindowHeight();
  let windowWidth = getWindowWidth();

  function handleMinCoverHeight(coverHeight) {
    return coverHeight > 300 ? coverHeight : 300; // also present in bookCard.css
  }

  const [coverHeight, setCoverHeight] = useState(handleMinCoverHeight(
    heightForCover
      ? heightForCover * COVER_PROPORTION
      : windowHeight * COVER_PROPORTION,
  ));
  const [displayAdultContent, setDisplayAdultContent] = useState(getDisplayAdultContent());
  const [openAdultModal, setOpenAdultModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setCoverHeight(handleMinCoverHeight(
      heightForCover
        ? heightForCover * COVER_PROPORTION
        : windowHeight * COVER_PROPORTION,
    ));

    function handleStorageChange() {
      setDisplayAdultContent(getDisplayAdultContent());
    }

    function handleScroll() {
      const scrollThreshold = getWindowHeight() * 0.40;
      if (window.scrollY > scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    function handleResize() {
      if (!isMobile() && !heightForCover) {
        setCoverHeight(handleMinCoverHeight(getWindowHeight() * COVER_PROPORTION));
      }
    }

    function handleOrientationChange() {
      if (!heightForCover) {
        const windowHeightCopy = windowHeight;
        const windowWidthCopy = windowWidth;
        windowHeight = windowWidthCopy;
        windowWidth = windowHeightCopy;
        setCoverHeight(handleMinCoverHeight(windowHeight * COVER_PROPORTION));
      }
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [heightForCover]);

  return (
    <div className="bookCard-cover-container">
      <div
        className="bookCard-cover"
        style={{
          height: `${coverHeight}px`,
          transform: !scrolled ? '' : `perspective(4000px) rotateX(95deg) translateY(-${coverHeight / 2}px) translateZ(calc(-${coverHeight / 2}px + 15px))`,
        }}
      >
        <img
          className="bookCard-cover-top"
          src={book.cover ? getBookCoverSrc(book.cover) : imgNoCover}
          style={{ display: !isAdultContent(book) || displayAdultContent ? 'block' : 'none' }}
          alt="book-top"
        />
        {isAdultContent(book) && !displayAdultContent && (
          <div
            className="bookCard-cover-top bookCard-cover-adult"
            style={{
              height: `${coverHeight}px`,
              width: `calc(${coverHeight}px * 0.65)`,
            }}
          >
            <AdultCover onClick={() => setOpenAdultModal(true)} />
          </div>
        )}
        <img className="bookCard-cover-side" src={imgBookSide} alt="book-side" />
      </div>
      <img className="bookCard-woodenShelf" src={imgWoodenShelf} alt="wooden-shelf" />

      <AdultModal
        visible={openAdultModal}
        onClose={() => setOpenAdultModal(false)}
      />
    </div>
  );
}

CoverSection.propTypes = {
  book: PropTypes.shape({
    cover: PropTypes.string,
  }).isRequired,
  heightForCover: PropTypes.number,
};

export default CoverSection;
