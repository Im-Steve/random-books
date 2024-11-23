import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { imgLogoWebsite } from '../../assets/Images';
import './mainNavbar.css';

function MainNavbar() {
  const { t } = useTranslation();

  return (
    <>
      <div className="mainNavbar-space" />
      <div className="mainNavbar-fixed">
        <Link to="/" title={t('tooltipHome')}>
          <img className="mainNavbar-logo" src={imgLogoWebsite} alt="logo" />
          <p className="mainNavbar-title">{t('websiteName')}</p>
        </Link>
      </div>
      <div className="mainNavbar-top-overlay" />
    </>
  );
}

export default MainNavbar;
