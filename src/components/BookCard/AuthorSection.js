import React from 'react';
import PropTypes from 'prop-types';

import DropdownText from '../DropdownText/DropdownText';
import { getAuthorImgSrc } from '../../func/getSrc';
import { getRandomizerUrl } from '../../func/getUrl';
import i18n from '../../i18n/i18n';
import './bookCard.css';

function AuthorSection({ book = {}, onBioResize, bioHeight }) {
  return (
    (book.authorBio
    && (
      (Array.isArray(book.authorsWithLink) && book.authorsWithLink.length === 1)
      || (Array.isArray(book.authors) && book.authors.length === 1)
    ))
    && (
      <div className="bookCard-section">
        <div className="bookCard-authorBio-header">
          {book.authorImg && (
            <img src={getAuthorImgSrc(book.authorImg)} alt="author" />
          )}

          <div>
            <h2>{i18n.t('headerAuthorBio')}</h2>
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
              <a
                className="h1"
                href={getRandomizerUrl({
                  mainCategory: Array.isArray(book.mainCategories) ? book.mainCategories[0] : '',
                  author: book.authors[0],
                })}
              >
                {book.authors[0]}
              </a>
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

AuthorSection.defaultProps = {
  onBioResize: () => {},
  bioHeight: 0,
};

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
