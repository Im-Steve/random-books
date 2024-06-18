import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AuthorSection from './AuthorSection';
import CommentsSection from './CommentsSection';
import CoverSection from './CoverSection';
import DetailsSection from './DetailsSection';
import Footer from '../Footer/Footer';
import { getWindowHeight } from '../../func/getWindowData';
import { imgBookWall } from '../../assets/Images';
import { NAVBAR_HEIGHT } from '../../constants';
import SellersSection from './SellersSection';
import SocialSection from './SocialSection';
import TitleSection from './TitleSection';
import './bookCard.css';

function BookCard({
  book = {},
  heightForCover = 0,
  onHold = false,
  onDescResize = () => {},
  onBioResize = () => {},
  descHeight = 0,
  bioHeight = 0,
}) {
  const [windowHeight, setWindowHeight] = useState(getWindowHeight());

  useEffect(() => {
    function handleResize() {
      setWindowHeight(getWindowHeight());
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className="bookCard"
      style={{
        backgroundImage: `url('${imgBookWall}')`,
        minHeight: `${windowHeight - NAVBAR_HEIGHT}px`,
      }}
    >
      <div className="bookCard-panel">
        <CoverSection book={book} heightForCover={heightForCover} />
      </div>
      <div className="bookCard-panel">
        <TitleSection
          book={book}
          onDescResize={(height) => onDescResize(height)}
          descHeight={descHeight}
        />
        <SellersSection book={book} />
        <DetailsSection book={book} />
        <AuthorSection
          book={book}
          onBioResize={(height) => onBioResize(height)}
          bioHeight={bioHeight}
        />
        <SocialSection book={book} />
        {!onHold && <CommentsSection book={book} />}
        {book.ISBN && <Footer />}
      </div>
    </div>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape().isRequired,
  heightForCover: PropTypes.number,
  onHold: PropTypes.bool,
  onDescResize: PropTypes.func,
  onBioResize: PropTypes.func,
  descHeight: PropTypes.number,
  bioHeight: PropTypes.number,
};

export default BookCard;
