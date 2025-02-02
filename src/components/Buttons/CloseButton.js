import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import './buttons.css';

function CloseButton({ onClick, text }) {
  const { t } = useTranslation();

  return (
    <p className="button button-close" onClick={onClick}>
      {text || t('buttonClose')}
    </p>
  );
}

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default CloseButton;
