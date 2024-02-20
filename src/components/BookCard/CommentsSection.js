import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './bookCard.css';

function CommentsSection({ book = {} }) {
  const [iframeHeight, setIframeHeight] = useState(null);

  useEffect(() => {
    function handleMessage(event) {
      if (event && event.origin === 'https://www.quialu.ca' && event.data) {
        setIframeHeight(event.data.height);
      }
    }

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    book.commentIframeSrc && (
      <div className="bookCard-section bookCard-iframe">
        <iframe
          src={book.commentIframeSrc}
          title="quialu"
          height={`${iframeHeight}px`}
          width="100%"
          style={{ border: 0 }}
        />
      </div>
    )
  );
}

CommentsSection.propTypes = {
  book: PropTypes.shape({
    commentIframeSrc: PropTypes.string,
  }).isRequired,
};

export default CommentsSection;
