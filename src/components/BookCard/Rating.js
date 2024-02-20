import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../i18n/i18n';
import { StarDemiIcon, StarEmptyIcon, StarFullIcon } from '../../assets/Icons';

function Rating({ book = {} }) {
  const { rating, ratingLink } = book;

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
    rating && rating > 0 && ratingLink
      ? (
        <div>
          <div className="rating-stars">
            {getStar(0)}
            {getStar(1)}
            {getStar(2)}
            {getStar(3)}
            {getStar(4)}
          </div>
          <a className="p2" href={ratingLink} target="_blank" rel="noreferrer">
            {`${i18n.t('accordingToUsersOf')} ${i18n.t('websiteRating')}`}
          </a>
        </div>
      ) : ''
  );
}

Rating.propTypes = {
  book: PropTypes.shape({
    rating: PropTypes.number,
    ratingLink: PropTypes.string,
  }).isRequired,
};

export default Rating;
