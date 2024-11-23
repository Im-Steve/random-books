import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import './buttons.css';

function SaveButton({ onClick, text, disabled = false }) {
  const { t } = useTranslation();

  return (
    <p className={`button button-save ${disabled ? 'button-save-disabled' : ''}`} onClick={onClick}>
      {text || t('buttonSave')}
    </p>
  );
}

SaveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SaveButton;
