import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './bookCard.css';

function DetailSquare({
  header,
  text,
  link = null,
  hasExternalLink = false,
  Icon,
}) {
  return (
    <div className="bookCard-details-square">
      <p>{header}</p>
      <Icon />
      {!link && <p title={text}>{text}</p>}
      {link && (
        <Link
          to={link}
          target={hasExternalLink ? '_blank' : ''}
          rel={hasExternalLink ? 'noreferrer' : ''}
          title={text}
        >
            {text}
        </Link>
      )}
    </div>
  );
}

DetailSquare.propTypes = {
  header: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
  hasExternalLink: PropTypes.bool,
  Icon: PropTypes.func.isRequired,
};

export default DetailSquare;
