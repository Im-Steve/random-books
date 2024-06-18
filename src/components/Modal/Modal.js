import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getWindowHeight } from '../../func/getWindowData';
import './modal.css';

function Modal({ children, visible, onClose }) {
  const [windowHeight, setWindowHeight] = useState(getWindowHeight());

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    function handleResize() {
      setWindowHeight(getWindowHeight());
    }
    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
    };
  }, [visible]);

  function handleClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    visible && (
      <div
        className="modal-container"
        onClick={handleClick}
        style={{ height: `${windowHeight}px` }}
      >
          {children}
      </div>
    )
  );
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
