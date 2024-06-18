import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../i18n/i18n';
import './buttons.css';

function DeleteMiniButton({ onClick }) {
  return (
    <p className="button button-mini button-delete" onClick={onClick}>
      {i18n.t('generalDelete')}
    </p>
  );
}

DeleteMiniButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteMiniButton;
