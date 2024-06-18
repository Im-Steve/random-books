import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../i18n/i18n';
import './buttons.css';

function CancelButton({ onClick }) {
  return (
    <p className="button button-cancel" onClick={onClick}>
      {i18n.t('generalCancel')}
    </p>
  );
}

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CancelButton;
