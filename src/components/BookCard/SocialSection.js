import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import SocialLink from './SocialLink';
import './bookCard.css';

function SocialSection({ book = {} }) {
  const { t } = useTranslation();

  return (
    Array.isArray(book.socialLinks) && book.socialLinks.length > 0 && (
      <div className="section bookCard-social">
        <h2>{t('bookHeaderSocial')}</h2>
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
