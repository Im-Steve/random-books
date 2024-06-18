import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getWindowHeight } from './func/getWindowData';
import MainNavbar from './components/MainNavbar/MainNavbar';
import { NAVBAR_HEIGHT } from './constants';

function Page({ Module }) {
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
    <>
      <MainNavbar />
      <div
        className="page"
        style={{ minHeight: `${windowHeight - NAVBAR_HEIGHT}px` }}
      >
        <Module />
      </div>
    </>
  );
}

Page.propTypes = {
  Module: PropTypes.func.isRequired,
};

export default Page;
