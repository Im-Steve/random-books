import React from 'react';
import PropTypes from 'prop-types';

import './bookCard.css';

function DetailSquare({
  title,
  text,
  link,
  hasExternalLink,
  Icon,
}) {
  return (
    <div className="bookCard-details-square">
      <p>{title}</p>
      <Icon />
      {!link && <p title={text}>{text}</p>}
      {link && (
        <a
          href={link}
          target={hasExternalLink ? '_blank' : ''}
          rel={hasExternalLink ? 'noreferrer' : ''}
          title={text}
        >
            {text}
        </a>
      )}
    </div>
  );
}

DetailSquare.defaultProps = {
  link: null,
  hasExternalLink: false,
};

DetailSquare.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
  hasExternalLink: PropTypes.bool,
  Icon: PropTypes.func.isRequired,
};

export default DetailSquare;
