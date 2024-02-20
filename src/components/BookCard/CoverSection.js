import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getBookCoverSrc } from '../../func/getSrc';
import { imgBookSide, imgNoCover, imgWoodenShelf } from '../../assets/Images';
import './bookCard.css';

const COVER_PROPORTION = 0.67;

function CoverSection({ book = {}, windowHeight }) {
  const [coverHeight, setCoverHeight] = useState(
    windowHeight
      ? windowHeight * COVER_PROPORTION
      : window.innerHeight * COVER_PROPORTION,
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleResize() {
      const isMobile = /Mobi/i.test(window.navigator.userAgent);
      if (!isMobile) {
        setCoverHeight(window.innerHeight * COVER_PROPORTION);
      }
    }

    function handleScroll() {
      const scrollThreshold = window.innerHeight * 0.40;
      if (window.scrollY > scrollThreshold
      && window.innerHeight > window.innerWidth) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          alt="book-top"
        />
        <img className="bookCard-cover-side" src={imgBookSide} alt="book-side" />
      </div>
      <img className="bookCard-woodenShelf" src={imgWoodenShelf} alt="wooden-shelf" />
    </div>
  );
}

CoverSection.defaultProps = {
  windowHeight: 0,
};

CoverSection.propTypes = {
  book: PropTypes.shape({
    cover: PropTypes.string,
  }).isRequired,
  windowHeight: PropTypes.number,
};

export default CoverSection;
