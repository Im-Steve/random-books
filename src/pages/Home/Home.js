import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BookForm from '../../components/BookForm/BookForm';
import { HeartIcon } from '../../assets/Icons';
import i18n from '../../i18n/i18n';
import { imgHomeBgLandscape, imgHomeBgPortrait, imgLogoWebsite } from '../../assets/Images';
import { getIsPortrait, getWindowHeight, isMobile } from '../../func/getWindowData';
import { TIGER_LINK } from '../../constants';
import './home.css';

// const indexSubheader = Math.floor(Math.random() * 7) + 1;
const indexSubheader = 1;

function Home() {
  const [formInFilling, setFormInFilling] = useState(false);
  const [fixedWindowHeight, setFixedWindowHeight] = useState(getWindowHeight());
  const [dynamicWindowHeight, setDynamicWindowHeight] = useState(getWindowHeight());
  const [isPortrait, setIsPortrait] = useState(getIsPortrait());

  useEffect(() => {
    function handleResize() {
      if (!isMobile()) {
        setFixedWindowHeight(getWindowHeight());
      }
      setDynamicWindowHeight(getWindowHeight());
      setIsPortrait(getIsPortrait());
    }

    function handleOrientationChange() {
      setTimeout(() => {
        setFixedWindowHeight(getWindowHeight());
        setDynamicWindowHeight(getWindowHeight());
        setIsPortrait(getIsPortrait());
      }, 100);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return (
    <>
      <div
        className="home-bg"
        style={{
          backgroundImage: isPortrait ? `url('${imgHomeBgPortrait}')` : `url('${imgHomeBgLandscape}')`,
          height: `${fixedWindowHeight + 250}px`,
        }}
      />

      <div
        className="home"
        style={{ minHeight: `${dynamicWindowHeight}px` }}
      >
        <div className="home-h1">
          <img src={imgLogoWebsite} alt="logo" />
          <p>{i18n.t('websiteName')}</p>
        </div>

        <div className="home-h2">
          <p>{i18n.t(`homeSubheader${indexSubheader}1`)}</p>
          <p>{i18n.t(`homeSubheader${indexSubheader}2`)}</p>
        </div>

        <div className="home-form">
          <BookForm inFilling={setFormInFilling} />
        </div>

        <a
          className="home-footer"
          href={TIGER_LINK}
          target="_blank"
          rel="noreferrer"
        >
          {i18n.t('homeFooter1')}
          <span>
            {i18n.t('homeFooter2')}
          </span>
        </a>
      </div>

      {(!isPortrait || !formInFilling) && (
        <Link
          className="home-likes-icon"
          to="/likes"
          title={i18n.t('likesHeader')}
        >
          <HeartIcon />
        </Link>
      )}
    </>
  );
}

export default Home;
