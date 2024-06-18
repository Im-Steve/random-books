import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { addOneLikedBook, getLikedBooks } from '../../func/handleLocalStorage';
import {
  ArrowSingleLeftIcon,
  CloseIcon,
  HeartIcon,
  HomeIcon,
  ShareIcon,
} from '../../assets/Icons';
import { getBookUrl } from '../../func/getUrl';
import { getWindowHeight } from '../../func/getWindowData';
import i18n from '../../i18n/i18n';
import './actionButtons.css';

function ActionButtons({
  singleBook = false,
  firstItem = false,
  lastItem = false,
  onLike = () => {},
  onDislike = () => {},
  onBack = () => {},
  book = {},
  disabledActions = false,
}) {
  const [displayPopupHeart, setDisplayPopupHeart] = useState(false);
  const [displayPopupShare, setDisplayPopupShare] = useState(false);
  const [bookLiked, setBookLiked] = useState(!!getLikedBooks()[book.ISBN]);
  const [windowHeight, setWindowHeight] = useState(getWindowHeight());

  useEffect(() => {
    function handleResize() {
      setWindowHeight(getWindowHeight());
    }

    function handleStorageChange() {
      setBookLiked(!!getLikedBooks()[book.ISBN]);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  function handleLike() {
    if (!singleBook || !bookLiked) {
      addOneLikedBook(book);
      setDisplayPopupHeart(true);
      setTimeout(() => setDisplayPopupHeart(false), 1200);
      onLike();

      if (singleBook) {
        setBookLiked(true);
      }
    }
  }

  async function handleShare() {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(getBookUrl(book));
    }
    setDisplayPopupShare(true);
    setTimeout(() => setDisplayPopupShare(false), 2000);
  }

  return (
    <>
      {/* like button */}
      <div className={`actionButton-box ${!singleBook ? 'actionButton-box-like' : 'actionButton-box-center'} ${lastItem ? 'hidden' : ''}`}>
        <div
          className={`actionButton-like ${singleBook ? 'actionButton-like-single' : ''} ${singleBook && bookLiked ? 'actionButton-like-on' : ''}`}
          onClick={handleLike}
          title={i18n.t('tooltipLike')}
        >
          <HeartIcon />
        </div>
      </div>

      {/* share button */}
      <div className={`actionButton-box ${!singleBook ? 'actionButton-box-share' : 'actionButton-box-share-center'} ${lastItem ? 'hidden' : ''}`}>
        <div
          className="actionButton-share"
          onClick={handleShare}
          title={i18n.t('tooltipShare')}
        >
          <ShareIcon />
        </div>
      </div>

      {!singleBook && (
        <>
          {/* dislike button */}
          <div className={`actionButton-box actionButton-box-dislike ${lastItem ? 'hidden' : ''}`}>
            <div
              className="actionButton-dislike"
              onClick={onDislike}
              title={i18n.t('tooltipDislike')}
            >
              <CloseIcon />
            </div>
          </div>

          {/* back button */}
          <div className={`actionButton-box ${!lastItem ? 'actionButton-box-back' : 'actionButton-box-back-center'} ${firstItem ? 'hidden' : ''}`}>
            <div
              className="actionButton-back"
              onClick={onBack}
              title={i18n.t('tooltipBack')}
            >
              <ArrowSingleLeftIcon />
            </div>
          </div>

          {/* home button */}
          <div className={`actionButton-box actionButton-box-center ${!lastItem ? 'hidden' : ''}`}>
            <Link
              className="actionButton-home"
              to="/"
              title={i18n.t('tooltipHome')}
            >
              <HomeIcon />
            </Link>
          </div>
        </>
      )}

      {/* disabled */}
      {disabledActions && (
        <div
          className="actionButtons-popup"
          style={{ height: `${windowHeight}px` }}
        />
      )}

      {/* popups */}
      {displayPopupHeart && (
        <div
          className="actionButtons-popup"
          style={{ height: `${windowHeight}px` }}
        >
          <HeartIcon className="actionButtons-popup-heart" />
        </div>
      )}

      {displayPopupShare && (
        <div
          className="actionButtons-popup"
          style={{ height: `${windowHeight}px` }}
        >
          <p className="actionButtons-popup-share">
            {i18n.t('bookLinkCopied')}
          </p>
        </div>
      )}
    </>
  );
}

ActionButtons.propTypes = {
  singleBook: PropTypes.bool,
  firstItem: PropTypes.bool,
  lastItem: PropTypes.bool,
  onLike: PropTypes.func,
  onDislike: PropTypes.func,
  onBack: PropTypes.func,
  book: PropTypes.shape().isRequired,
  disabledActions: PropTypes.bool,
};

export default ActionButtons;
