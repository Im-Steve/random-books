import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

import { getWindowHeight } from '../../func/getWindowData';
import './pageLoading.css';

function PageLoading({ noBackground = false }) {
  const [windowHeight, setWindowHeight] = useState(getWindowHeight());

  useEffect(() => {
    function handleResize() {
      setWindowHeight(getWindowHeight());
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className="pageLoading"
      style={{
        backgroundColor: noBackground ? 'transparent' : null,
        height: `${windowHeight}px`,
      }}
    >
      <ReactLoading
        type="spokes"
        color="#ffffff"
        height={64}
        width={64}
      />
    </div>
  );
}

PageLoading.propTypes = {
  noBackground: PropTypes.bool,
};

export default PageLoading;
