import React from 'react';

import i18n from '../../i18n/i18n';
import { imgPageNotFound } from '../../assets/Images';
import './pageNotFound.css';

function PageNotFound() {
  return (
    <div className="pageNotFound">
      <img src={imgPageNotFound} alt="404" />
      <p>{i18n.t('pageNotFound')}</p>
    </div>
  );
}

export default PageNotFound;
