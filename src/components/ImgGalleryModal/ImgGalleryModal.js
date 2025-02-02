import React from 'react';
import PropTypes from 'prop-types';

import CloseButton from '../Buttons/CloseButton';
import ImgGallery from '../ImgGallery/ImgGallery';
import Modal from '../Modal/Modal';
import './imgGalleryModal.css';

function ImgGalleryModal({
  onClose,
  images,
  startingIndex = 0,
}) {
  return (
    <Modal onClose={onClose}>
      <div className="img-gallery-modal">
        <ImgGallery startingIndex={startingIndex}>
          <>
            {images.map((image) => (
              <div className="img-gallery-modal-image" key={image}>
                <img
                  src={image}
                  alt="book-image"
                />
              </div>
            ))}
          </>
        </ImgGallery>

        <div className="img-gallery-modal-bottom">
          <CloseButton onClick={onClose} />
        </div>
      </div>
    </Modal>
  );
}

ImgGalleryModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  startingIndex: PropTypes.number,
};

export default ImgGalleryModal;
