import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../i18n/i18n';
import { imgNoResult } from '../../assets/Images';
import './noResult.css';

function NoResult({ textName }) {
  return (
    <div className="noResult">
      <img src={imgNoResult} alt="no-result" />
      <p>{i18n.t(`noResult${textName}`)}</p>
      <p>{i18n.t('noResultEnd')}</p>
    </div>
  );
}

NoResult.defaultProps = {
  textName: 'Search',
};

NoResult.propTypes = {
  textName: PropTypes.string,
};

export default NoResult;
