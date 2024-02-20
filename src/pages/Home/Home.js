import React, { useEffect, useState } from 'react';

import BookForm from '../../components/BookForm/BookForm';
import i18n from '../../i18n/i18n';
import { imgHomeLandscape, imgHomePortrait, imgLogoWebsite } from '../../assets/Images';
import './home.css';

// const indexSubheader = Math.floor(Math.random() * 7) + 1;
const indexSubheader = 1;

function Home() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isPortrait, setIsPortrait] = useState(window.matchMedia('(orientation: portrait)').matches);

  useEffect(() => {
    function handleResize() {
      const isMobile = /Mobi/i.test(window.navigator.userAgent);
      if (!isMobile) {
        setWindowHeight(window.innerHeight);
      }
      setIsPortrait(window.matchMedia('(orientation: portrait)').matches);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div
        className="home-bg"
        style={{
          backgroundImage: isPortrait ? `url('${imgHomePortrait}')` : `url('${imgHomeLandscape}')`,
          height: `${windowHeight + 250}px`,
        }}
      />
      <div className="home-layer" />

      <div className="home">
        <div className="home-h1">
          <img src={imgLogoWebsite} alt="logo" />
          <p>{i18n.t('titleWebsite')}</p>
        </div>

        <div className="home-h2">
          <p>{i18n.t(`homeSubheader${indexSubheader}1`)}</p>
          <p>{i18n.t(`homeSubheader${indexSubheader}2`)}</p>
        </div>

        <div className="home-form">
          <BookForm />
        </div>

        <a
          className="home-footer"
          href="https://www.linkedin.com/in/le-tigre-noir-8339342a5/"
          target="_blank"
          rel="noreferrer"
        >
          {i18n.t('footerHome1')}
          <span>
            {i18n.t('footerHome2')}
          </span>
        </a>
      </div>
    </>
  );
}

export default Home;
