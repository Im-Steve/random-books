import React from 'react';
import PropTypes from 'prop-types';

import './buttons.css';

function AcceptButton({ text, onClick }) {
  return (
    <p className="button button-accept" onClick={onClick}>
      {text}
    </p>
  );
}

AcceptButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AcceptButton;
