import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import {
  ArrowSquareLeftIcon2,
  ArrowSquareRightIcon2,
} from '../../assets/Icons';
import { getWindowWidth } from '../../func/getWindowData';
import './imgGallery.css';

function ImgGallery({ children, startingIndex = 0 }) {
  const [childWidth, setChildWidth] = useState(0);
  const [galleryWidth, setGalleryWidth] = useState(0);
  const [index, setIndex] = useState(startingIndex);
  const [isReady, setIsReady] = useState(false);
  const [onScroll, setOnScroll] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      const list = listRef.current;
      const currentGalleryWidth = list.scrollWidth;
      const currentChildCount = list.childElementCount;
      const currentChildWidth = currentGalleryWidth / currentChildCount;

      const currentScrollLeft = index * currentChildWidth;
      setScrollLeft(currentScrollLeft);
      list.scrollLeft = currentScrollLeft;

      setGalleryWidth(currentGalleryWidth);
      setChildWidth(currentChildWidth);
    }

    function handleResize() {
      setWindowWidth(getWindowWidth);
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    setIsReady(true);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [index, windowWidth]);

  const handleScroll = (direction) => {
    setOnScroll(true);

    const list = listRef.current;
    if (list) {
      if (direction === 'left') {
        setIndex(index - 1);
      } else if (direction === 'right') {
        setIndex(index + 1);
      }
    }
  };

  return (
    <div className="img-gallery">
      <div
        className="img-gallery-list"
        ref={listRef}
        style={{ scrollBehavior: onScroll ? 'smooth' : 'none' }}
      >
        {children}
      </div>
      <div className="img-gallery-scrollBtn-container">
        <div className="img-gallery-scrollBtn">
          {isReady && scrollLeft > 0 && (
            <ArrowSquareLeftIcon2 onClick={() => handleScroll('left')} />
          )}
        </div>
        <div className="img-gallery-scrollBtn">
          {isReady && galleryWidth - childWidth - scrollLeft > 0 && (
            <ArrowSquareRightIcon2 onClick={() => handleScroll('right')} />
          )}
        </div>
      </div>
    </div>
  );
}

ImgGallery.propTypes = {
  children: PropTypes.object.isRequired,
  startingIndex: PropTypes.number,
};

export default ImgGallery;
