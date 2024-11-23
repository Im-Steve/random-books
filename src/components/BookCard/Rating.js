import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { StarDemiIcon, StarEmptyIcon, StarFullIcon } from '../../assets/Icons';

function Rating({ book = {} }) {
  const { t } = useTranslation();

  const { rating, ratingLink, ratingSrc } = book;

  function getStar(position) {
    if (rating >= position + 0.3 && rating < position + 0.8) {
      return (<StarDemiIcon />);
    }
    if (rating >= position + 0.8) {
      return (<StarFullIcon />);
    }
    return (<StarEmptyIcon />);
  }

  return (
    rating && rating > 0 && ratingLink && ratingSrc
      ? (
        <div>
          <div className="bookCard-rating-stars">
            {getStar(0)}
            {getStar(1)}
            {getStar(2)}
            {getStar(3)}
            {getStar(4)}
          </div>
          <a className="p2" href={ratingLink} target="_blank" rel="noreferrer">
            {`${t('ratingAccordingTo')} ${ratingSrc}`}
          </a>
        </div>
      ) : ''
  );
}

Rating.propTypes = {
  book: PropTypes.shape({
    rating: PropTypes.number,
    ratingLink: PropTypes.string,
    ratingSrc: PropTypes.string,
  }).isRequired,
};

export default Rating;
