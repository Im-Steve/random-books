import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import './censoredImage.css';

function CensoredImage({ onClick }) {
  const { t } = useTranslation();

  return (
    <div
      className="image-censored"
      onClick={onClick}
    >
      <p>18+</p>
      <p>{t('generalClickToDisplay')}</p>
    </div>
  );
}

CensoredImage.propTypes = {
  onClick: PropTypes.func,
};

export default CensoredImage;
