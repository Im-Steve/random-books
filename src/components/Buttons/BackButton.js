import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ArrowSingleLeftIcon } from '../../assets/Icons';
import './buttons.css';

function BackButton({ className, mode = 'light' }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <div className={className}>
      <p
        className={`button button-back ${mode === 'light' ? 'button-back-light' : ''} ${mode === 'dark' ? 'button-back-dark' : ''}`}
        onClick={goBack}
      >
        <ArrowSingleLeftIcon />
        {t('buttonBack')}
      </p>
    </div>
  );
}

BackButton.propTypes = {
  className: PropTypes.string,
  mode: PropTypes.string,
};

export default BackButton;
