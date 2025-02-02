import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import AdultModal from '../AdultModal/AdultModal';
import Gallery from '../Gallery/Gallery';
import { getBookImageSrc } from '../../func/getExternalSrc';
import { getDisplayAdultContent } from '../../func/handleSessionStorage';
import ImgGalleryModal from '../ImgGalleryModal/ImgGalleryModal';
import isAdultContent from '../../func/isAdultContent';
import MiniCensoredImage from '../CensoredImage/MiniCensoredImage';
import './bookCard.css';

function ImagesSection({ book = {} }) {
  const { t } = useTranslation();

  const [displayAdultContent, setDisplayAdultContent] = useState(getDisplayAdultContent());
  const [indexToSee, setIndexToSee] = useState(0);
  const [openAdultModal, setOpenAdultModal] = useState(false);
  const [openGalleryModal, setOpenGalleryModal] = useState(false);

  useEffect(() => {
    function handleStorageChange() {
      setDisplayAdultContent(getDisplayAdultContent());
    }

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    Array.isArray(book.images) && book.images.length > 1 && (
      <>
        <div className="section section-highlighted">
          <h2>{t('bookHeaderImages')}</h2>

          <Gallery>
            <>
              {book.images.map((image, index) => (
                isAdultContent(book) && !displayAdultContent ? (
                  <div className="bookCard-thumbnail-adult gallery-img" key={image}>
                    <MiniCensoredImage onClick={() => setOpenAdultModal(true)} />
                  </div>
                ) : (
                  <img
                    className="bookCard-thumbnail gallery-img"
                    src={getBookImageSrc(image)}
                    alt="book-image"
                    key={image}
                    onClick={() => { setIndexToSee(index); setOpenGalleryModal(true); }}
                  />
                )
              ))}
            </>
          </Gallery>
        </div>

        {openGalleryModal && (
          <ImgGalleryModal
            onClose={() => setOpenGalleryModal(false)}
            images={book.images.map((image) => getBookImageSrc(image))}
            startingIndex={indexToSee}
          />
        )}

        {openAdultModal && (
          <AdultModal onClose={() => setOpenAdultModal(false)} />
        )}
      </>
    )
  );
}

ImagesSection.propTypes = {
  book: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ImagesSection;
