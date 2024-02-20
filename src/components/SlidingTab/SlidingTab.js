import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './slidingTab.css';

const MAX_WIDTH = 500;

function SlidingTab({
  Module,
  side,
  open,
  onClose,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    function handleWindowWidth() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleWindowWidth);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleWindowWidth);
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
        <div
          className="slidingTab-overlay"
          onClick={onClose}
        />
      )}

      <div
        className="slidingTab"
        style={{
          left: side === 'left' ? handlePosition() : '',
          right: side === 'right' ? handlePosition() : '',
        }}
      >
        <Module />
      </div>
    </>
  );
}

SlidingTab.propTypes = {
  Module: PropTypes.func.isRequired,
  side: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SlidingTab;
