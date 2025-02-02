import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { useTranslation } from 'react-i18next';

import {
  ArrowDoubleLeftIcon,
  ArrowDoubleRightIcon,
  HeartIcon,
  HeartOutlineIcon,
  HomeOutlineIcon,
  FilterIcon,
  FilterOutlineIcon,
  SettingsOutlineIcon,
} from '../../assets/Icons';
import FilterTab from '../Tabs/FilterTab';
import LikesTab from '../Tabs/LikesTab';
import SettingsModal from '../SettingsModal/SettingsModal';
import SlidingTab from '../SlidingTab/SlidingTab';
import './booksNavbar.css';

function BooksNavbar({ left = '', right = '', showTutorial = false }) {
  const { t } = useTranslation();

  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [openSettingsModal, setOpenSettingsModal] = useState(false);

  return (
    <>
      <div
        className={`navbar-icon-box booksNavbar-icon-left-2 ${openRight || openLeft ? 'hidden' : ''}`}
        onClick={() => setOpenSettingsModal(true)}
        title={t('settingsHeader')}
      >
        <SettingsOutlineIcon />
      </div>
      {openSettingsModal && (
        <SettingsModal onClose={() => setOpenSettingsModal(false)} />
      )}

      {left === 'home' && (
        <Link
          className={`navbar-icon-box booksNavbar-icon-left ${openRight ? 'hidden' : ''}`}
          to="/"
          title={t('tooltipHome')}
        >
          <HomeOutlineIcon />
        </Link>
      )}

      {left === 'filter' && (
        <>
          <div
            className={`navbar-icon-box booksNavbar-icon-left ${openRight ? 'hidden' : ''} ${showTutorial ? 'tutorial-elem-for' : ''}`}
            onClick={!showTutorial ? () => setOpenLeft(!openLeft) : () => {}}
            title={t('filterHeader')}
            data-tooltip-id="tooltipFilterIcon"
            data-tooltip-content={t('tutorialFilterIcon')}
            data-tooltip-place="bottom"
          >
            {!openLeft
              ? <FilterOutlineIcon />
              : <FilterIcon className="icon-filter-open" />}
          </div>
          <ArrowDoubleLeftIcon
            className={`booksNavbar-arrow booksNavbar-arrow-left ${!openLeft ? 'hidden' : ''}`}
          />

          <SlidingTab
            side="left"
            open={openLeft}
            onClose={() => setOpenLeft(false)}
          >
            <FilterTab onClose={() => setOpenLeft(false)} />
          </SlidingTab>

          {showTutorial && (
            <Tooltip
              id="tooltipFilterIcon"
              isOpen={showTutorial}
              className="tutorial-tooltip tutorial-tooltip-filterIcon"
              arrowColor="white"
            />
          )}
        </>
      )}

      {right === 'likes' && (
        <>
          <div
            className={`navbar-icon-box booksNavbar-icon-right ${openLeft ? 'hidden' : ''} ${showTutorial ? 'tutorial-elem-for' : ''}`}
            onClick={!showTutorial ? () => setOpenRight(!openRight) : () => {}}
            title={t('likesHeader')}
            data-tooltip-id="tooltipListOfLikesIcon"
            data-tooltip-content={t('tutorialListOfLikesIcon')}
            data-tooltip-place="bottom"
          >
            {!openRight
              ? <HeartOutlineIcon />
              : <HeartIcon className="icon-likes-open" />}
          </div>
          <ArrowDoubleRightIcon
            className={`booksNavbar-arrow booksNavbar-arrow-right ${!openRight ? 'hidden' : ''}`}
          />

          <SlidingTab
            side="right"
            open={openRight}
            onClose={() => setOpenRight(false)}
          >
            <LikesTab
              onClose={() => setOpenRight(false)}
              isVisible={openRight}
            />
          </SlidingTab>

          {showTutorial && (
            <Tooltip
              id="tooltipListOfLikesIcon"
              isOpen={showTutorial}
              className="tutorial-tooltip tutorial-tooltip-listOfLikesIcon"
              arrowColor="white"
            />
          )}
        </>
      )}
    </>
  );
}

BooksNavbar.propTypes = {
  left: PropTypes.string,
  right: PropTypes.string,
  showTutorial: PropTypes.bool,
};

export default BooksNavbar;
