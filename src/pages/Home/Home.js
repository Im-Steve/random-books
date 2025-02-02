import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import BookForm from '../../components/BookForm/BookForm';
import { FAKE_SAFARI_TIME, TIGER_EMAIL, TIGER_LINK } from '../../constants';
import {
  getIsPortrait,
  getWindowHeight,
  getWindowWidth,
  isMobile,
} from '../../func/getWindowData';
import {
  EmailIcon,
  HeartIcon,
  LanguageIcon,
  SettingsIcon,
} from '../../assets/Icons';
import {
  imgHomeBgLandscape,
  imgHomeBgPortrait,
  imgLogoLinktree,
  imgLogoWebsite,
} from '../../assets/Images';
import isSafari from '../../func/isSafari';
import LanguageSelect from '../../components/LanguageSelect/LanguageSelect';
import { sendEventGA, sendPageViewGA } from '../../analytics';
import SettingsModal from '../../components/SettingsModal/SettingsModal';
import './home.css';

// const indexSubheader = Math.floor(Math.random() * 7) + 1;
const indexSubheader = 1;

function Home() {
  const { t } = useTranslation();
  sendPageViewGA();

  let currentWindowHeight;
  let currentWindowWidth;

  const [dynamicWindowHeight, setDynamicWindowHeight] = useState(0);
  const [fixedWindowHeight, setFixedWindowHeight] = useState(0);
  const [formInFilling, setFormInFilling] = useState(false);
  const [isPortrait, setIsPortrait] = useState(getIsPortrait());
  const [isReady, setIsReady] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  useEffect(() => {
    const windowTimer = setTimeout(() => {
      currentWindowHeight = getWindowHeight();
      currentWindowWidth = getWindowWidth();
      setFixedWindowHeight(getWindowHeight());
      setDynamicWindowHeight(getWindowHeight());
      setIsReady(true);
    }, !isSafari() ? 100 : FAKE_SAFARI_TIME);

    function handleResize() {
      if (!isMobile()) {
        setFixedWindowHeight(getWindowHeight());
      }
      setDynamicWindowHeight(getWindowHeight());
      setIsPortrait(getIsPortrait());
    }

    function handleOrientationChange() {
      const windowHeightCopy = currentWindowHeight;
      const windowWidthCopy = currentWindowWidth;
      currentWindowHeight = windowWidthCopy;
      currentWindowWidth = windowHeightCopy;
      setFixedWindowHeight(currentWindowHeight);
      setDynamicWindowHeight(currentWindowHeight);
      setIsPortrait(getIsPortrait());
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      clearTimeout(windowTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  function onClickFooter() {
    sendEventGA({
      category: 'Navigation',
      action: 'Click on creator link in home',
      label: 'Link in the home footer',
    });
  }

  function getBackgroundHeight() {
    if (!isMobile()) {
      return fixedWindowHeight;
    }
    return `${fixedWindowHeight + 250}px`;
  }

  return (
    <>
      {isReady && (
        <div
          className="home-bg"
          style={{
            backgroundImage: isPortrait ? `url('${imgHomeBgPortrait}')` : `url('${imgHomeBgLandscape}')`,
            height: getBackgroundHeight(),
          }}
        />
      )}

      {isReady && (
        <div
          className="home"
          style={{ minHeight: `${dynamicWindowHeight}px` }}
        >
          <div className="home-h1">
            <img src={imgLogoWebsite} alt="logo" />
            <p>{t('websiteName')}</p>
          </div>

          <div className="home-h2">
            <p>{t(`homeSubheader${indexSubheader}1`)}</p>
            <p>{t(`homeSubheader${indexSubheader}2`)}</p>
          </div>

          <div className="home-form">
            <BookForm inFilling={setFormInFilling} />
          </div>

          <div className="home-footer">
            <a
              href={TIGER_LINK}
              target="_blank"
              rel="noreferrer"
              onClick={onClickFooter}
            >
              {t('homeFooter1')}
              <span>
                {t('homeFooter2')}
              </span>
              {t('homeFooter3')}
            </a>

            <div className="home-footer-links">
              <a
                className="home-footer-links-icon"
                href={`mailto:${TIGER_EMAIL}`}
                onClick={onClickFooter}
              >
                <EmailIcon />
              </a>
              <a
                href={TIGER_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={onClickFooter}
              >
                <img
                  className="home-footer-links-linktree"
                  src={imgLogoLinktree}
                  alt="Linktree"
                />
              </a>
            </div>
          </div>
        </div>
      )}

      {isReady && (!isPortrait || !formInFilling) && (
        <>
          <div className="home-language">
            <LanguageIcon className="language-select-icon" />
            <LanguageSelect />
          </div>

          <Link
            className="home-icon home-icon-likes"
            to="/likes"
            title={t('likesHeader')}
          >
            <HeartIcon />
          </Link>

          <div
            className="home-icon home-icon-settings"
            title={t('settingsHeader')}
            onClick={() => setOpenSettingsModal(true)}
          >
            <SettingsIcon />
          </div>

          {openSettingsModal && (
            <SettingsModal onClose={() => setOpenSettingsModal(false)} />
          )}
        </>
      )}
    </>
  );
}

export default Home;
