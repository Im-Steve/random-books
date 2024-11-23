import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DropdownText from '../DropdownText/DropdownText';
import { ExternalLinkIcon } from '../../assets/Icons';
import { FEATURED_CATEGORIES } from '../../constants';
import { getCollectionUrl, getRandomizerUrl, getSeriesUrl } from '../../func/getInternalUrl';
import Rating from './Rating';
import './bookCard.css';

function TitleSection({
  book = {},
  onDescResize = () => {},
  descHeight = 0,
}) {
  const { t } = useTranslation();

  return (
    (book.title
    || Array.isArray(book.authorsWithLink)
    || Array.isArray(book.authors)
    || (book.rating && book.rating > 0)
    || Array.isArray(book.mainCategoriesWithLink)
    || Array.isArray(book.mainCategories)
    || Array.isArray(book.subcategoriesWithLink)
    || Array.isArray(book.subcategories)
    || book.description
    || (book.excerptLink || book.downloadLink))
    && (
      <div className="section">
        {(book.title || Array.isArray(book.authorsWithLink) || Array.isArray(book.authors)) && (
          <div className="bookCard-header">
            <h1>{book.title}</h1>
            <p>
              {Array.isArray(book.authorsWithLink)
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
                    {index < book.authorsWithLink.length - 1
                      && <span>{`,${String.fromCharCode(160)}`}</span>}
                  </span>
                ))}
              {!Array.isArray(book.authorsWithLink) && Array.isArray(book.authors)
                && book.authors.map((author, index) => (
                  <span key={author}>
                    <Link
                      className="h2"
                      to={getRandomizerUrl({
                        mainCategory: Array.isArray(book.mainCategories) ? book.mainCategories[0] : '',
                        author,
                        language: book.language,
                      })}
                    >
                      {author}
                    </Link>
                    {index < book.authors.length - 1
                      && <span>{`,${String.fromCharCode(160)}`}</span>}
                  </span>
                ))}
            </p>
          </div>
        )}

        <Rating book={book} />

        {(Array.isArray(book.mainCategoriesWithLink)
        || Array.isArray(book.mainCategories)
        || Array.isArray(book.subcategoriesWithLink)
        || Array.isArray(book.subcategories)) && (
          <div className="bookCard-categories">
            {Array.isArray(book.mainCategoriesWithLink)
              && book.mainCategoriesWithLink.map((categoryWithLink) => (
                <a
                  className={`bookCard-category bookCard-category-main ${FEATURED_CATEGORIES.includes(categoryWithLink.category) ? 'bookCard-category-featured' : ''}`}
                  href={categoryWithLink.link}
                  target="_blank"
                  rel="noreferrer"
                  key={categoryWithLink.category}
                >
                  {categoryWithLink.category}
                </a>
              ))}
            {!Array.isArray(book.mainCategoriesWithLink) && Array.isArray(book.mainCategories)
              && book.mainCategories.map((category) => (
                <Link
                  className={`bookCard-category bookCard-category-main ${FEATURED_CATEGORIES.includes(category) ? 'bookCard-category-featured' : ''}`}
                  to={getRandomizerUrl({
                    mainCategory: category,
                    subcategory: category.toLowerCase() === 'wattpad' ? book.subcategories[0] : null,
                    language: book.language,
                  })}
                  key={category}
                >
                  {category}
                </Link>
              ))}

            {Array.isArray(book.subcategoriesWithLink)
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
            {!Array.isArray(book.subcategoriesWithLink) && Array.isArray(book.subcategories)
              && book.subcategories.map((category) => (
                <Link
                  className="bookCard-category"
                  to={getRandomizerUrl({
                    mainCategory: Array.isArray(book.mainCategories)
                      ? book.mainCategories.join().toLowerCase().includes('wattpad') ? 'Wattpad' : book.mainCategories[0]
                      : '',
                    subcategory: category,
                    language: book.language,
                  })}
                  key={category}
                >
                  {category}
                </Link>
              ))}
          </div>
        )}

        {book.seriesCode && (
          <p className="bookCard-text-series">
            {t('bookTextSeries1')}
            {Number.isInteger(book.seriesPosition) && book.seriesPosition < 50 ? `${book.seriesPosition} ` : '' }
            {t('bookTextSeries2')}
            <Link to={getSeriesUrl(book)}>
              {book.seriesName}
            </Link>
          </p>
        )}

        {!book.seriesCode && book.publisher && book.collection && (
          <p className="bookCard-text-series">
            {t('bookTextCollection1')}
            <Link to={getCollectionUrl(book)}>
              {book.collection}
            </Link>
            {t('bookTextCollection2')}
            {book.publisher}
          </p>
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
              {t('bookReadAnExcerpt')}
            </a>
          </div>
        )}
      </div>
    )
  );
}

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
