import React from 'react';
import PropTypes from 'prop-types';

import './censoredImage.css';

function MiniCensoredImage({ onClick }) {
  return (
    <div
      className={`image-censored-mini ${onClick ? 'image-censored-mini-clickable' : ''}`}
      onClick={onClick}
    >
      <p>18+</p>
    </div>
  );
}

MiniCensoredImage.propTypes = {
  onClick: PropTypes.func,
};

export default MiniCensoredImage;
