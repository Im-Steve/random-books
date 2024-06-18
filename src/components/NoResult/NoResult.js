import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getWindowHeight } from '../../func/getWindowData';
import i18n from '../../i18n/i18n';
import { imgNoResult } from '../../assets/Images';
import { NAVBAR_HEIGHT } from '../../constants';
import './noResult.css';

function NoResult({ messageType = 'Search' }) {
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
    <div className="noResult" style={{ height: `${windowHeight - NAVBAR_HEIGHT}px` }}>
      <img src={imgNoResult} alt="no-result" />
      <p>{i18n.t(`noResult${messageType}`)}</p>
      <p>{i18n.t('noResultEnd')}</p>
    </div>
  );
}

NoResult.propTypes = {
  messageType: PropTypes.string,
};

export default NoResult;
