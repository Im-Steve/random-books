import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../i18n/i18n';
import SocialLink from './SocialLink';
import './bookCard.css';

function SocialSection({ book = {} }) {
  return (
    Array.isArray(book.socialLinks) && book.socialLinks.length > 0 && (
      <div className="bookCard-section bookCard-social">
        <h2>{i18n.t('bookHeaderSocial')}</h2>
          {book.socialLinks.map((link) => (
            <SocialLink link={link} key={link} />
          ))}
      </div>
    )
  );
}

SocialSection.propTypes = {
  book: PropTypes.shape({
    socialLinks: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default SocialSection;
