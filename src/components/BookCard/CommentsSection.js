import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getDisplayAdultContent } from '../../func/handleSessionStorage';
import { hasCookieConsent } from '../../analytics';
import isAdultContent from '../../func/isAdultContent';
import './bookCard.css';

function CommentsSection({ book = {} }) {
  const [iframeHeight, setIframeHeight] = useState(null);
  const [displayAdultContent, setDisplayAdultContent] = useState(getDisplayAdultContent());

  useEffect(() => {
    function handleMessage(event) {
      if (event && event.origin === 'https://www.quialu.ca' && event.data) {
        setIframeHeight(event.data.height);
      }
    }

    function handleStorageChange() {
      setDisplayAdultContent(getDisplayAdultContent());
    }

    window.addEventListener('message', handleMessage);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    book.commentIframeSrc
    && hasCookieConsent()
    && (!isAdultContent(book) || displayAdultContent)
    && (
      <div className="section bookCard-iframe">
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
