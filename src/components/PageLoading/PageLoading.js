import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

import './pageLoading.css';

function PageLoading({ noBackground }) {
  return (
    <div
      className="pageLoading"
      style={noBackground ? { backgroundColor: 'transparent' } : {}}
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

PageLoading.defaultProps = {
  noBackground: false,
};

PageLoading.propTypes = {
  noBackground: PropTypes.bool,
};

export default PageLoading;
