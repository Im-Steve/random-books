import React from 'react';
import { Link } from 'react-router-dom';

import i18n from '../../i18n/i18n';
import { imgLogoWebsite } from '../../assets/Images';
import './mainNavbar.css';

function MainNavbar() {
  return (
    <>
      <div className="mainNavbar-space" />
      <div className="mainNavbar-fixed">
        <Link to="/" title={i18n.t('tooltipHome')}>
          <img className="mainNavbar-logo" src={imgLogoWebsite} alt="logo" />
          <p className="mainNavbar-title">{i18n.t('titleWebsite')}</p>
        </Link>
      </div>
      <div className="mainNavbar-top-overlay" />
    </>
  );
}

export default MainNavbar;
