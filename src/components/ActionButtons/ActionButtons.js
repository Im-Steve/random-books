import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { useTranslation } from 'react-i18next';

import { addOneLikedBook } from '../../func/handleLocalStorage';
import {
  ArrowSingleLeftIcon,
  CloseIcon,
  HeartIcon,
  HomeIcon,
  ShareIcon,
} from '../../assets/Icons';
import { FEATURED_CATEGORIES } from '../../constants';
import { getBookUrl } from '../../func/getInternalUrl';
import { sendEventGA } from '../../analytics';
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
  showTutorial = false,
}) {
  const { t } = useTranslation();

  const [displayPopupHeart, setDisplayPopupHeart] = useState(false);
  const [displayPopupShare, setDisplayPopupShare] = useState(false);
  const [bookLiked, setBookLiked] = useState(false);

  function handleLike() {
    if (!singleBook || !bookLiked) {
      if (Array.isArray(book.mainCategories)
      && FEATURED_CATEGORIES.includes(book.mainCategories[0])) {
        sendEventGA({
          category: 'Featured Book',
          action: `Like featured book "${book.title || 'null'}"`,
          label: book.id || book.ISBN || 'null',
        });
      } else {
        sendEventGA({
          category: 'Action Button',
          action: 'Like book',
          label: book.id || book.ISBN || 'media',
        });
      }

      addOneLikedBook(book);
      setDisplayPopupHeart(true);
      setTimeout(() => setDisplayPopupHeart(false), 1200);
      onLike();

      if (singleBook) {
        setBookLiked(true);
      }
    }
  }

  function handleDislike() {
    sendEventGA({
      category: 'Action Button',
      action: 'Dislike book',
      label: book.id || book.ISBN || 'media',
    });

    onDislike();
  }

  async function handleShare() {
    sendEventGA({
      category: 'Action Button',
      action: 'Share book',
      label: book.id || book.ISBN || 'media',
    });

    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      if (book.externalLink) {
        await navigator.clipboard.writeText(book.externalLink);
      } else {
        await navigator.clipboard.writeText(`${window.location.origin}${getBookUrl(book)}`);
      }
    }
    setDisplayPopupShare(true);
    setTimeout(() => setDisplayPopupShare(false), 2000);
  }

  return (
    <>
      {/* like button */}
      <div
        className={`actionButton-box ${!singleBook ? 'actionButton-box-like' : 'actionButton-box-center'} ${lastItem ? 'hidden' : ''} ${showTutorial ? 'tutorial-elem-for' : ''}`}
        data-tooltip-id="tooltipLikeButton"
        data-tooltip-content={t('tutorialLikeButton')}
        data-tooltip-place="top"
      >
        <div
          className={`actionButton-like ${singleBook ? 'actionButton-like-single' : ''} ${singleBook && bookLiked ? 'actionButton-like-on' : ''}`}
          onClick={!showTutorial ? handleLike : () => {}}
          title={t('tooltipLike')}
        >
          <HeartIcon />
        </div>
      </div>
      {showTutorial && (
        <Tooltip
          id="tooltipLikeButton"
          isOpen={showTutorial}
          className="tutorial-tooltip tutorial-tooltip-likeButton"
          arrowColor="white"
        />
      )}

      {/* share button */}
      <div
        className={`actionButton-box ${!singleBook ? 'actionButton-box-share' : 'actionButton-box-share-center'} ${lastItem ? 'hidden' : ''} ${showTutorial ? 'tutorial-elem-for' : ''}`}
        data-tooltip-id="tooltipShareButton"
        data-tooltip-content={t('tutorialShareButton')}
        data-tooltip-place="bottom"
      >
        <div
          className="actionButton-share"
          onClick={!showTutorial ? handleShare : () => {}}
          title={t('tooltipShare')}
        >
          <ShareIcon />
        </div>
      </div>
      {showTutorial && (
        <Tooltip
          id="tooltipShareButton"
          isOpen={showTutorial}
          className="tutorial-tooltip tutorial-tooltip-shareButton"
          arrowColor="white"
        />
      )}

      {!singleBook && (
        <>
          {/* dislike button */}
          <div
            className={`actionButton-box actionButton-box-dislike ${lastItem ? 'hidden' : ''} ${showTutorial ? 'tutorial-elem-for' : ''}`}
            data-tooltip-id="tooltipDislikeButton"
            data-tooltip-content={t('tutorialDislikeButton')}
            data-tooltip-place="left"
          >
            <div
              className="actionButton-dislike"
              onClick={!showTutorial ? handleDislike : () => {}}
              title={t('tooltipDislike')}
            >
              <CloseIcon />
            </div>
          </div>
          {showTutorial && (
            <Tooltip
              id="tooltipDislikeButton"
              isOpen={showTutorial}
              className="tutorial-tooltip tutorial-tooltip-dislikeButton"
              arrowColor="white"
            />
          )}

          {/* back button */}
          <div className={`actionButton-box ${!lastItem ? 'actionButton-box-back' : 'actionButton-box-back-center'} ${firstItem ? 'hidden' : ''}`}>
            <div
              className="actionButton-back"
              onClick={onBack}
              title={t('tooltipBack')}
            >
              <ArrowSingleLeftIcon />
            </div>
          </div>

          {/* home button */}
          <div className={`actionButton-box actionButton-box-center ${!lastItem ? 'hidden' : ''}`}>
            <Link
              className="actionButton-home"
              to="/"
              title={t('tooltipHome')}
            >
              <HomeIcon />
            </Link>
          </div>
        </>
      )}

      {/* disabled */}
      {disabledActions && (
        <div className="actionButtons-popup" />
      )}

      {/* popups */}
      {displayPopupHeart && (
        <div className="actionButtons-popup">
          <HeartIcon className="actionButtons-popup-heart" />
        </div>
      )}

      {displayPopupShare && (
        <div className="actionButtons-popup">
          <p className="actionButtons-popup-share">
            {t('generalLinkCopied')}
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
  showTutorial: PropTypes.bool,
};

export default ActionButtons;
