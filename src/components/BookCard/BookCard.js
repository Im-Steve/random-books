import React from 'react';
import PropTypes from 'prop-types';

import AuthorSection from './AuthorSection';
import CommentsSection from './CommentsSection';
import CoverSection from './CoverSection';
import DetailsSection from './DetailsSection';
import Footer from '../Footer/Footer';
import { imgBookWall } from '../../assets/Images';
import SellersSection from './SellersSection';
import SocialSection from './SocialSection';
import TitleSection from './TitleSection';
import './bookCard.css';

function BookCard({
  book = {},
  className,
  windowHeight,
  onHold,
  onDescResize,
  onBioResize,
  descHeight,
  bioHeight,
}) {
  return (
    <div
      className={`bookCard ${className}`}
      style={{ backgroundImage: `url('${imgBookWall}')` }}
    >
      <div className="bookCard-panel">
        <CoverSection book={book} windowHeight={windowHeight} />
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

BookCard.defaultProps = {
  className: '',
  windowHeight: 0,
  onHold: false,
  onDescResize: () => {},
  onBioResize: () => {},
  descHeight: 0,
  bioHeight: 0,
};

BookCard.propTypes = {
  book: PropTypes.shape().isRequired,
  className: PropTypes.string,
  windowHeight: PropTypes.number,
  onHold: PropTypes.bool,
  onDescResize: PropTypes.func,
  onBioResize: PropTypes.func,
  descHeight: PropTypes.number,
  bioHeight: PropTypes.number,
};

export default BookCard;
