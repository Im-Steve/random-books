import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  ArrowDoubleLeftIcon,
  ArrowDoubleRightIcon,
  HeartIcon,
  HeartLineIcon,
  HomeLineIcon,
  FilterIcon,
  FilterLineIcon,
} from '../../assets/Icons';
import FilterTab from '../Tabs/FilterTab';
import i18n from '../../i18n/i18n';
import LikesTab from '../Tabs/LikesTab';
import SlidingTab from '../SlidingTab/SlidingTab';
import './booksNavbar.css';

function BooksNavbar({ left = '', right = '' }) {
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);

  return (
    <>
      {left === 'home' && (
        <Link
          className="navbar-icon-box booksNavbar-icon-left"
          to="/"
          title={i18n.t('tooltipHome')}
        >
          <HomeLineIcon />
        </Link>
      )}

      {left === 'filter' && (
        <SlidingTab
          side="left"
          open={openLeft}
          onClose={() => setOpenLeft(false)}
        >
          <FilterTab />
        </SlidingTab>
      )}

      {right === 'likes' && (
        <SlidingTab
          side="right"
          open={openRight}
          onClose={() => setOpenRight(false)}
        >
          <LikesTab />
        </SlidingTab>
      )}

      {left === 'filter' && (
        <>
          <div
            className={`navbar-icon-box booksNavbar-icon-left ${openRight ? 'hidden' : ''}`}
            onClick={() => setOpenLeft(!openLeft)}
            title={i18n.t('filterHeader')}
          >
            {!openLeft
              ? <FilterLineIcon />
              : <FilterIcon className="icon-filter-open" />}
          </div>
          <ArrowDoubleLeftIcon
            className={`booksNavbar-arrow booksNavbar-arrow-left ${!openLeft ? 'hidden' : ''}`}
          />
        </>
      )}

      {right === 'likes' && (
        <>
          <div
            className={`navbar-icon-box booksNavbar-icon-right ${openLeft ? 'hidden' : ''}`}
            onClick={() => setOpenRight(!openRight)}
            title={i18n.t('likesHeader')}
          >
            {!openRight
              ? <HeartLineIcon />
              : <HeartIcon className="icon-likes-open" />}
          </div>
          <ArrowDoubleRightIcon
            className={`booksNavbar-arrow booksNavbar-arrow-right ${!openRight ? 'hidden' : ''}`}
          />
        </>
      )}
    </>
  );
}

BooksNavbar.propTypes = {
  left: PropTypes.string,
  right: PropTypes.string,
};

export default BooksNavbar;
