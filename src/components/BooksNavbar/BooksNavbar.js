import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  ArrowDoubleLeftIcon,
  ArrowDoubleRightIcon,
  HeartIcon,
  HeartLineIcon,
  HomeLineIcon,
  OptionsIcon,
  OptionsLineIcon,
} from '../../assets/Icons';
import i18n from '../../i18n/i18n';
import LikesTab from '../Tabs/LikesTab';
import OptionsTab from '../Tabs/OptionsTab';
import SlidingTab from '../SlidingTab/SlidingTab';
import './booksNavbar.css';

function BooksNavbar({ left, right }) {
  const [openOptions, setOpenOptions] = useState(false);
  const [openLikes, setOpenLikes] = useState(false);

  return (
    <>
      <SlidingTab
        Module={OptionsTab}
        side="left"
        open={openOptions}
        onClose={() => setOpenOptions(false)}
      />
      <SlidingTab
        Module={LikesTab}
        side="right"
        open={openLikes}
        onClose={() => setOpenLikes(false)}
      />

      {left === 'home' && (
        <Link
          className="navbar-icon-box booksNavbar-icon-left"
          to="/"
          title={i18n.t('tooltipHome')}
        >
          <HomeLineIcon />
        </Link>
      )}

      {left === 'options' && (
        <>
          <div
            className={`navbar-icon-box booksNavbar-icon-left ${openLikes ? 'hidden' : ''}`}
            onClick={() => setOpenOptions(!openOptions)}
            title={i18n.t('headerFilter')}
          >
            {!openOptions
              ? <OptionsLineIcon />
              : <OptionsIcon className="icon-options-open" />}
          </div>
          <ArrowDoubleLeftIcon
            className={`booksNavbar-arrow booksNavbar-arrow-left ${!openOptions ? 'hidden' : ''}`}
          />
        </>
      )}

      {right === 'likes' && (
        <>
          <div
            className={`navbar-icon-box booksNavbar-icon-right ${openOptions ? 'hidden' : ''}`}
            onClick={() => setOpenLikes(!openLikes)}
            title={i18n.t('headerLikes')}
          >
            {!openLikes
              ? <HeartLineIcon />
              : <HeartIcon className="icon-likes-open" />}
          </div>
          <ArrowDoubleRightIcon
            className={`booksNavbar-arrow booksNavbar-arrow-right ${!openLikes ? 'hidden' : ''}`}
          />
        </>
      )}
    </>
  );
}

BooksNavbar.defaultProps = {
  left: '',
  right: '',
};

BooksNavbar.propTypes = {
  left: PropTypes.string,
  right: PropTypes.string,
};

export default BooksNavbar;
