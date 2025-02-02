import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import './buttons.css';

function CloseMiniButton({ onClick, text }) {
  const { t } = useTranslation();

  return (
    <p className="button button-mini button-close" onClick={onClick}>
      {text || t('buttonClose')}
    </p>
  );
}

CloseMiniButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default CloseMiniButton;
