import React from 'react';
import PropTypes from 'prop-types';

import DropdownText from '../DropdownText/DropdownText';
import { ExternalLinkIcon } from '../../assets/Icons';
import { getRandomizerUrl } from '../../func/getUrl';
import i18n from '../../i18n/i18n';
import Rating from './Rating';
import './bookCard.css';

function TitleSection({ book = {}, onDescResize, descHeight }) {
  return (
    (book.title
    || (Array.isArray(book.authorsWithLink) && book.authorsWithLink.length > 0)
    || (Array.isArray(book.authors) && book.authors.length > 0)
    || (book.rating && book.rating > 0)
    || (Array.isArray(book.mainCategoriesWithLink) && book.mainCategoriesWithLink.length > 0)
    || (Array.isArray(book.subcategoriesWithLink) && book.subcategoriesWithLink.length > 0)
    || (Array.isArray(book.mainCategories) && book.mainCategories.length > 0)
    || (Array.isArray(book.subcategories) && book.subcategories.length > 0)
    || book.description
    || (book.excerptLink || book.downloadLink))
    && (
      <div className="bookCard-section">
        {(book.title || (Array.isArray(book.authors) && book.authors.length > 0)) && (
          <div className="bookCard-header">
            <h1>{book.title}</h1>
            <p>
              {Array.isArray(book.authorsWithLink) && book.authorsWithLink.length > 0
                && book.authorsWithLink.map((authorWithLink, index) => (
                  <span key={authorWithLink.author}>
                    <a
                      className="h2"
                      href={authorWithLink.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {authorWithLink.author}
                    </a>
                    {book.authorsWithLink.length > 1 && index < book.authorsWithLink.length - 1
                      && <span>{`,${String.fromCharCode(160)}`}</span>}
                  </span>
                ))}
              {!Array.isArray(book.authorsWithLink)
              && Array.isArray(book.authors) && book.authors.length > 0
                && book.authors.map((author, index) => (
                  <span key={author}>
                    <a
                      className="h2"
                      href={getRandomizerUrl({
                        mainCategory: Array.isArray(book.mainCategories) ? book.mainCategories[0] : '',
                        author,
                      })}
                    >
                      {author}
                    </a>
                    {book.authors.length > 1 && index < book.authors.length - 1
                      && <span>{`,${String.fromCharCode(160)}`}</span>}
                  </span>
                ))}
            </p>
          </div>
        )}

        <Rating book={book} />

        {((Array.isArray(book.mainCategoriesWithLink) && book.mainCategoriesWithLink.length > 0)
        || (Array.isArray(book.subcategoriesWithLink) && book.subcategoriesWithLink.length > 0)
        || (Array.isArray(book.mainCategories) && book.mainCategories.length > 0)
        || (Array.isArray(book.subcategories) && book.subcategories.length > 0)) && (
          <div className="bookCard-categories">
            {book.mainCategoriesWithLink
              && book.mainCategoriesWithLink.map((categoryWithLink) => (
                <a
                  className={`bookCard-category bookCard-category-main ${categoryWithLink.category === 'En vedette' ? 'bookCard-category-featured' : ''}`}
                  href={categoryWithLink.link}
                  target="_blank"
                  rel="noreferrer"
                  key={categoryWithLink.category}
                >
                  {categoryWithLink.category}
                </a>
              ))}
            {!book.mainCategoriesWithLink && book.mainCategories
              && book.mainCategories.map((category) => (
                <a
                  className={`bookCard-category bookCard-category-main ${category === 'En vedette' ? 'bookCard-category-featured' : ''}`}
                  href={getRandomizerUrl({
                    mainCategory: category,
                  })}
                  key={category}
                >
                  {category}
                </a>
              ))}

            {book.subcategoriesWithLink
              && book.subcategoriesWithLink.map((categoryWithLink) => (
                <a
                  className="bookCard-category"
                  href={categoryWithLink.link}
                  target="_blank"
                  rel="noreferrer"
                  key={categoryWithLink.category}
                >
                  {categoryWithLink.category}
                </a>
              ))}
            {book.subcategories
              && book.subcategories.map((category) => (
                <a
                  className="bookCard-category"
                  href={getRandomizerUrl({
                    mainCategory: Array.isArray(book.mainCategories) ? book.mainCategories[0] : '',
                    subcategory: category,
                  })}
                  key={category}
                >
                  {category}
                </a>
              ))}
          </div>
        )}

        {book.description && (
          <DropdownText
            text={book.description}
            onTextResize={(height) => onDescResize(height)}
            boxHeight={descHeight}
          />
        )}

        {(book.excerptLink || book.downloadLink) && (
          <div className="bookCard-excerpt">
            <a
              href={book.excerptLink || book.downloadLink}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLinkIcon />
              {i18n.t('readAnExcerpt')}
            </a>
          </div>
        )}
      </div>
    )
  );
}

TitleSection.defaultProps = {
  onDescResize: () => {},
  descHeight: 0,
};

TitleSection.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    rating: PropTypes.number,
    mainCategories: PropTypes.arrayOf(PropTypes.string),
    subcategories: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    excerptLink: PropTypes.string,
    downloadLink: PropTypes.string,
  }).isRequired,
  onDescResize: PropTypes.func,
  descHeight: PropTypes.number,
};

export default TitleSection;
