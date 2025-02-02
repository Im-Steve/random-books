import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import './buttons.css';

function AcceptButton({ onClick, text }) {
  const { t } = useTranslation();

  return (
    <p className="button button-accept" onClick={onClick}>
      {text || t('buttonAccept')}
    </p>
  );
}

AcceptButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,

};

export default AcceptButton;
