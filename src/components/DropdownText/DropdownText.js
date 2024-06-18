import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import {
  ArrowSingleDownIcon,
  ArrowSingleUpIcon,
} from '../../assets/Icons';
import i18n from '../../i18n/i18n';
import './dropdownText.css';

const MAX_HEIGHT = 130; // in pixels

function DropdownText({ text, onTextResize = () => {}, boxHeight = 0 }) {
  const [textHeight, setTextHeight] = useState(boxHeight || null);
  const [unfold, setUnfold] = useState(false);

  const paragraphRef = useRef();

  function toggleText() {
    setUnfold(!unfold);
  }

  useEffect(() => {
    function handleHeight() {
      const paragraph = paragraphRef.current;
      if (paragraph) {
        setTextHeight(paragraph.offsetHeight);
        onTextResize(paragraph.offsetHeight);
      }
    }

    handleHeight();
    window.addEventListener('resize', handleHeight);

    return () => {
      window.removeEventListener('resize', handleHeight);
    };
  }, [text]);

  return (
    <div>
      <div
        className="dropdownText-container"
        style={{ maxHeight: !unfold ? `${MAX_HEIGHT}px` : `${textHeight}px` }}
      >
        <p
          ref={paragraphRef}
          dangerouslySetInnerHTML={{ __html: text }}
        />
        {textHeight > MAX_HEIGHT && !unfold && (
          <div className="dropdownText-fade" />
        )}
      </div>
      {textHeight > MAX_HEIGHT && (
        <div className="dropdownText-toggle">
          <p className="action" onClick={toggleText}>
            {!unfold
              ? (
                <>
                  <ArrowSingleDownIcon />
                  {i18n.t('seeMore')}
                </>
              )
              : (
                <>
                  <ArrowSingleUpIcon />
                  {i18n.t('seeLess')}
                </>
              )}
          </p>
        </div>
      )}
    </div>
  );
}

DropdownText.propTypes = {
  text: PropTypes.string.isRequired,
  onTextResize: PropTypes.func,
  boxHeight: PropTypes.number,
};

export default DropdownText;
