import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import {
  ArrowSquareLeftIcon,
  ArrowSquareRightIcon,
  BarcodeIcon,
  BookIcon,
  BuildingIcon,
  CalendarIcon,
  CollectionIcon,
  DimensionsIcon,
  EarthIcon,
  PeopleIcon,
} from '../../assets/Icons';
import DetailSquare from './DetailSquare';
import { getRandomizerUrl } from '../../func/getUrl';
import i18n from '../../i18n/i18n';
import ISODateToLocaleDate from '../../func/ISODateToLocaleDate';
import './bookCard.css';

function DetailsSection({ book = {} }) {
  const listRef = useRef(null);

  const handleScroll = (direction) => {
    const list = listRef.current;
    if (list) {
      const scrollAmount = list.offsetWidth * 0.75;
      if (direction === 'left') {
        list.scrollLeft -= scrollAmount;
      } else if (direction === 'right') {
        list.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    (book.nbOfPages
    || book.releaseDate
    || book.language
    || book.publisherWithLink
    || book.publisher
    || book.collectionWithLink
    || book.collection
    || book.targetAudience
    || book.dimensions
    || (Array.isArray(book.ISBNs) && book.ISBNs.length > 0))
    && (
      <div className="bookCard-section">
        <div className="bookCard-details">
          <div className="bookCard-details-scrollButton">
            <ArrowSquareLeftIcon onClick={() => handleScroll('left')} />
          </div>
          <div className="bookCard-details-list" ref={listRef}>
            {book.nbOfPages && (
              <div>
                <DetailSquare
                  header={i18n.t('bookHeaderNbPages')}
                  text={`${book.nbOfPages} ${i18n.t('pages')}`}
                  Icon={BookIcon}
                />
              </div>
            )}

            {book.releaseDate && (
              <div>
                <DetailSquare
                  header={i18n.t('bookHeaderReleaseDate')}
                  text={ISODateToLocaleDate(book.releaseDate)}
                  Icon={CalendarIcon}
                />
              </div>
            )}

            {book.language && (
              <div>
                <DetailSquare
                  header={i18n.t('bookHeaderLanguage')}
                  text={book.language}
                  Icon={EarthIcon}
                />
              </div>
            )}

            {(book.publisherWithLink || book.publisher) && (
              <div>
                <DetailSquare
                  header={i18n.t('bookHeaderPublisher')}
                  text={book.publisherWithLink
                    ? book.publisherWithLink.publisher
                    : book.publisher}
                  link={book.publisherWithLink
                    ? book.publisherWithLink.link
                    : getRandomizerUrl({
                      mainCategory: Array.isArray(book.mainCategories) ? book.mainCategories[0] : '',
                      publisher: book.publisher,
                    })}
                  hasExternalLink={!!book.publisherWithLink}
                  Icon={BuildingIcon}
                />
              </div>
            )}

            {(book.collectionWithLink || book.collection) && (
              <div>
                <DetailSquare
                  header={i18n.t('bookHeaderCollection')}
                  text={book.collectionWithLink
                    ? book.collectionWithLink.collection
                    : book.collection}
                  link={book.collectionWithLink
                    ? book.collectionWithLink.link
                    : getRandomizerUrl({
                      mainCategory: Array.isArray(book.mainCategories) ? book.mainCategories[0] : '',
                      publisher: book.publisher,
                      collection: book.collection,
                    })}
                  hasExternalLink={!!book.collectionWithLink}
                  Icon={CollectionIcon}
                />
              </div>
            )}

            {book.targetAudience && (
              <div>
                <DetailSquare
                  header={i18n.t('bookHeaderAudience')}
                  text={book.targetAudience}
                  Icon={PeopleIcon}
                />
              </div>
            )}

            {book.dimensions && (
              <div>
                <DetailSquare
                  header={i18n.t('bookHeaderDimensions')}
                  text={book.dimensions}
                  Icon={DimensionsIcon}
                />
              </div>
            )}

            {Array.isArray(book.ISBNs) && book.ISBNs.length > 0
              && book.ISBNs.map((ISBN) => (
                <div key={ISBN.isbn}>
                  <DetailSquare
                    header={`ISBN ${ISBN.format}`}
                    text={ISBN.isbn}
                    Icon={BarcodeIcon}
                  />
                </div>
              ))}
          </div>
          <div className="bookCard-details-scrollButton">
            <ArrowSquareRightIcon onClick={() => handleScroll('right')} />
          </div>
        </div>
      </div>
    )
  );
}

DetailsSection.propTypes = {
  book: PropTypes.shape({
    nbOfPages: PropTypes.number,
    releaseDate: PropTypes.string,
    language: PropTypes.string,
    publisher: PropTypes.string,
    collection: PropTypes.string,
    targetAudience: PropTypes.string,
    dimensions: PropTypes.string,
    ISBNs: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

export default DetailsSection;
