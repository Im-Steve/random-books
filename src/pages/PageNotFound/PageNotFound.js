import React, { useEffect, useState } from 'react';

import { getWindowHeight } from '../../func/getWindowData';
import i18n from '../../i18n/i18n';
import { imgPageNotFound } from '../../assets/Images';
import './pageNotFound.css';

function PageNotFound() {
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
    <div className="pageNotFound" style={{ height: `${windowHeight}px` }}>
      <img src={imgPageNotFound} alt="404" />
      <p>{i18n.t('pageNotFound')}</p>
    </div>
  );
}

export default PageNotFound;
