import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import {
  ArrowSquareLeftIcon,
  ArrowSquareRightIcon,
} from '../../assets/Icons';
import './gallery.css';

function Gallery({ children }) {
  const listRef = useRef(null);

  const handleScroll = (direction) => {
    const list = listRef.current;
    if (list) {
      const scrollAmount = list.offsetWidth * 0.75;
      if (direction === 'left') {
        list.scrollLeft -= scrollAmount;
      } else if (direction === 'right') {
        list.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div className="gallery">
      <div className="gallery-scrollButton">
        <ArrowSquareLeftIcon onClick={() => handleScroll('left')} />
      </div>
      <div className="gallery-list" ref={listRef}>
        {children}
      </div>
      <div className="gallery-scrollButton">
        <ArrowSquareRightIcon onClick={() => handleScroll('right')} />
      </div>
    </div>
  );
}

Gallery.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Gallery;
