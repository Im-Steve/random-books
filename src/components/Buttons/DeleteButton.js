import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../i18n/i18n';
import './buttons.css';

function DeleteButton({ onClick }) {
  return (
    <p className="button button-delete" onClick={onClick}>
      {i18n.t('delete')}
    </p>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
