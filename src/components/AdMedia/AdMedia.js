import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { useTranslation } from 'react-i18next';

import {
  ExternalLinkIcon,
  MediaIcon,
  VolumeHighIcon,
  VolumeOffIcon,
} from '../../assets/Icons';
import { getAdMediaSrc } from '../../func/getExternalSrc';
import { sendEventGA } from '../../analytics';
import './adMedia.css';

function AdMedia({ media = {}, onHold = false, height = null }) {
  const { t } = useTranslation();

  const [muted, setMuted] = useState(true);

  function onClickExternalLink(link) {
    sendEventGA({
      category: 'Ad',
      action: 'Click on External Link',
      label: link || 'null',
    });
  }

  return (
    <div
      className="adMedia-container"
      style={{ backgroundColor: media.backgroundColor || null }}
    >
      <div
        className="adMedia"
        style={{
          height: media.format === 'long' ? null : height || '100%',
          overflowY: media.format === 'long' ? 'auto' : 'hidden',
        }}
      >
        {media.type === 'image' && (
          <img className="adMedia-image" src={getAdMediaSrc(media.src)} alt="ad-image" />
        )}

        {onHold && media.type === 'video' && (
          <MediaIcon className="adMedia-bg-icon" />
        )}

        {!onHold && media.type === 'video' && (
          <ReactPlayer
            url={getAdMediaSrc(media.src)}
            playing={!onHold}
            loop
            controls={false}
            muted={muted}
            height="100%"
            width="100vw"
            playsinline
          />
        )}

        {!onHold && (
          <p className="adMedia-header">
            {t('adMediaHeader')}
          </p>
        )}

        {!onHold && media.externalLink && (
          <a
            className="adMedia-externalLink"
            href={media.externalLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => onClickExternalLink(media.externalLink)}
          >
            {t('adMediaExternalLink')}
            <ExternalLinkIcon />
          </a>
        )}

        {!onHold && media.type === 'video' && (
          muted ? (
            <VolumeOffIcon className="adMedia-muteButton" onClick={() => setMuted(!muted)} />
          ) : (
            <VolumeHighIcon className="adMedia-muteButton" onClick={() => setMuted(!muted)} />
          )
        )}
      </div>
    </div>
  );
}

AdMedia.propTypes = {
  media: PropTypes.shape().isRequired,
  onHold: PropTypes.bool,
  height: PropTypes.string,
};

export default AdMedia;
