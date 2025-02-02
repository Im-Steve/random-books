import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import './buttons.css';

function DeleteButton({ onClick, text }) {
  const { t } = useTranslation();

  return (
    <p className="button button-delete" onClick={onClick}>
      {text || t('buttonDelete')}
    </p>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default DeleteButton;
