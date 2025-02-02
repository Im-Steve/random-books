import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
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
import Gallery from '../Gallery/Gallery';
import { getCollectionUrl, getRandomizerUrl } from '../../func/getInternalUrl';
import ISODateToLocaleDate from '../../func/ISODateToLocaleDate';
import './bookCard.css';

function DetailsSection({ book = {} }) {
  const { t } = useTranslation();

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
      <div className="section section-highlighted">
        <Gallery>
          <>
            {book.nbOfPages && (
              <div>
                <DetailSquare
                  header={t('bookHeaderNbPages')}
                  text={`${book.nbOfPages} ${t('pages')}`}
                  Icon={BookIcon}
                />
              </div>
            )}

            {book.releaseDate && (
              <div>
                <DetailSquare
                  header={t('bookHeaderPublicationDate')}
                  text={ISODateToLocaleDate(book.releaseDate)}
                  Icon={CalendarIcon}
                />
              </div>
            )}

            {book.language && (
              <div>
                <DetailSquare
                  header={t('bookHeaderLanguage')}
                  text={book.language}
                  Icon={EarthIcon}
                />
              </div>
            )}

            {(book.publisherWithLink || book.publisher) && (
              <div>
                <DetailSquare
                  header={t('bookHeaderPublisher')}
                  text={book.publisherWithLink
                    ? book.publisherWithLink.publisher
                    : book.publisher}
                  link={book.publisherWithLink
                    ? book.publisherWithLink.link
                    : getRandomizerUrl({
                      mainCategory: Array.isArray(book.mainCategories) ? book.mainCategories[0] : '',
                      publisher: book.publisher,
                      language: book.language,
                    })}
                  hasExternalLink={!!book.publisherWithLink}
                  Icon={BuildingIcon}
                />
              </div>
            )}

            {(book.collectionWithLink || book.collection) && (
              <div>
                <DetailSquare
                  header={t('bookHeaderCollection')}
                  text={book.collectionWithLink
                    ? book.collectionWithLink.collection
                    : book.collection}
                  link={book.collectionWithLink
                    ? book.collectionWithLink.link
                    : getCollectionUrl(book)}
                  hasExternalLink={!!book.collectionWithLink}
                  Icon={CollectionIcon}
                />
              </div>
            )}

            {book.targetAudience && (
              <div>
                <DetailSquare
                  header={t('bookHeaderAudience')}
                  text={book.targetAudience}
                  Icon={PeopleIcon}
                />
              </div>
            )}

            {book.dimensions && (
              <div>
                <DetailSquare
                  header={t('bookHeaderDimensions')}
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

            {book.ASIN && (
              <div>
                <DetailSquare
                  header="ASIN"
                  text={book.ASIN}
                  Icon={BarcodeIcon}
                />
              </div>
            )}
          </>
        </Gallery>
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
