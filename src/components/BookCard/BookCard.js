import React from 'react';
import PropTypes from 'prop-types';

import AuthorSection from './AuthorSection';
import CommentsSection from './CommentsSection';
import CoverSection from './CoverSection';
import DetailsSection from './DetailsSection';
import { FEATURED_CATEGORIES } from '../../constants';
import Footer from '../Footer/Footer';
import ImagesSection from './ImagesSection';
import { imgBookWall } from '../../assets/Images';
import SellersSection from './SellersSection';
import { sendEventGA } from '../../analytics';
import SeriesSection from './SeriesSection';
import SocialSection from './SocialSection';
import TitleSection from './TitleSection';
import './bookCard.css';

function BookCard({
  book = {},
  windowHeightForCover = 0,
  onHold = false,
  onDescResize = () => {},
  onBioResize = () => {},
  descHeight = 0,
  bioHeight = 0,
  allBooksInTheCategory,
}) {
  if (Array.isArray(book.mainCategories)
  && FEATURED_CATEGORIES.includes(book.mainCategories[0])) {
    sendEventGA({
      category: 'Featured Book',
      action: `See featured book "${book.title || 'null'}"`,
      label: book.id || book.ISBN || 'null',
    });
  } else {
    sendEventGA({
      category: 'Book Card',
      action: 'See book card',
      label: book.id || book.ISBN || 'null',
    });
  }

  return (
    <div
      className="bookCard"
      style={{ backgroundImage: `url('${imgBookWall}')` }}
    >
      <div className="bookCard-panel">
        <CoverSection book={book} windowHeightForCover={windowHeightForCover} />
      </div>
      <div className="bookCard-panel">
        <TitleSection
          book={book}
          onDescResize={(height) => onDescResize(height)}
          descHeight={descHeight}
        />
        <ImagesSection book={book} />
        <SellersSection book={book} />
        <DetailsSection book={book} />
        <AuthorSection
          book={book}
          onBioResize={(height) => onBioResize(height)}
          bioHeight={bioHeight}
        />
        <SocialSection book={book} />
        {!onHold && (
          <SeriesSection
            book={book}
            allBooksInTheCategory={allBooksInTheCategory}
          />
        )}
        {!onHold && <CommentsSection book={book} />}
        {(book.id || book.ISBN) && <Footer />}
      </div>
    </div>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape().isRequired,
  windowHeightForCover: PropTypes.number,
  onHold: PropTypes.bool,
  onDescResize: PropTypes.func,
  onBioResize: PropTypes.func,
  descHeight: PropTypes.number,
  bioHeight: PropTypes.number,
  allBooksInTheCategory: PropTypes.arrayOf(PropTypes.shape()),
};

export default BookCard;
