import React from 'react';
import PropTypes from 'prop-types';

import MainNavbar from './components/MainNavbar/MainNavbar';

function Page({ Module }) {
  return (
    <>
      <MainNavbar />
      <div className="page">
        <Module />
      </div>
    </>
  );
}

Page.propTypes = {
  Module: PropTypes.func.isRequired,
};

export default Page;
