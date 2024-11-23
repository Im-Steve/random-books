import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { imgNoResult } from '../../assets/Images';
import './noResult.css';

function NoResult({ messageType = 'Search' }) {
  const { t } = useTranslation();

  return (
    <div className="noResult">
      <img src={imgNoResult} alt="no-result" />
      <p>{t(`noResult${messageType}`)}</p>
      <p>{t('noResultEnd')}</p>
    </div>
  );
}

NoResult.propTypes = {
  messageType: PropTypes.string,
};

export default NoResult;
