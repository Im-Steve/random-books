import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DropdownText from '../DropdownText/DropdownText';
import { getAuthorImgSrc } from '../../func/getExternalSrc';
import { getRandomizerUrl } from '../../func/getInternalUrl';
import './bookCard.css';

function AuthorSection({
  book = {},
  onBioResize = () => {},
  bioHeight = 0,
}) {
  const { t } = useTranslation();

  return (
    (book.authorBio
    && (
      (Array.isArray(book.authorsWithLink) && book.authorsWithLink.length === 1)
      || (Array.isArray(book.authors) && book.authors.length === 1)
    ))
    && (
      <div className="section">
        <div className="bookCard-authorBio-header">
          {book.authorImg && (
            <img src={getAuthorImgSrc(book.authorImg)} alt="author" />
          )}

          <div>
            <h2>{t('bookHeaderAuthorBio')}</h2>
            {Array.isArray(book.authorsWithLink) && (
              <a
                className="h1"
                href={book.authorsWithLink[0].link}
                target="_blank"
                rel="noreferrer"
              >
                {book.authorsWithLink[0].author}
              </a>
            )}

            {!Array.isArray(book.authorsWithLink) && Array.isArray(book.authors) && (
              <Link
                className="h1"
                to={getRandomizerUrl({
                  mainCategory: Array.isArray(book.mainCategories) ? book.mainCategories[0] : '',
                  author: book.authors[0],
                  language: book.language,
                })}
              >
                {book.authors[0]}
              </Link>
            )}
          </div>
        </div>

        <DropdownText
          text={book.authorBio}
          onTextResize={(height) => onBioResize(height)}
          boxHeight={bioHeight}
        />
      </div>
    )
  );
}

AuthorSection.propTypes = {
  book: PropTypes.shape({
    authors: PropTypes.arrayOf(PropTypes.string),
    authorBio: PropTypes.string,
    authorImg: PropTypes.string,
  }).isRequired,
  onBioResize: PropTypes.func,
  bioHeight: PropTypes.number,
};

export default AuthorSection;
