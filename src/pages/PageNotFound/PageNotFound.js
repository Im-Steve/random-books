import React from 'react';
import { useTranslation } from 'react-i18next';

import { imgPageNotFound } from '../../assets/Images';
import './pageNotFound.css';

function PageNotFound() {
  const { t } = useTranslation();

  return (
    <div className="pageNotFound">
      <img src={imgPageNotFound} alt="404" />
      <p>{t('pageNotFound')}</p>
    </div>
  );
}

export default PageNotFound;
