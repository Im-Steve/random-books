import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../i18n/i18n';
import './adultCover.css';

function AdultCover({ onClick }) {
  return (
    <div
      className="cover-censored"
      onClick={onClick}
    >
      <p>18+</p>
      <p>{i18n.t('adultCoverClickToDisplay')}</p>
    </div>
  );
}

AdultCover.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AdultCover;
