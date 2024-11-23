import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getWindowWidth } from '../../func/getWindowData';
import './slidingTab.css';

const MAX_WIDTH = 500; // also present in slidingTab.css

function SlidingTab({
  children,
  side,
  open,
  onClose,
}) {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    function handleResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
    };
  }, [open]);

  function handlePosition() {
    if (open) {
      return '0px';
    }
    return windowWidth > MAX_WIDTH ? `-${MAX_WIDTH}px` : '-100vw';
  }

  return (
    <>
      {open && (
        <div className="slidingTab-overlay" onClick={onClose} />
      )}

      <div
        className="slidingTab"
        style={{
          left: side === 'left' ? handlePosition() : '',
          right: side === 'right' ? handlePosition() : '',
        }}
      >
        {children}
      </div>
    </>
  );
}

SlidingTab.propTypes = {
  children: PropTypes.object.isRequired,
  side: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SlidingTab;
