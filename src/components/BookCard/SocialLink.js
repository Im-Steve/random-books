import React from 'react';
import PropTypes from 'prop-types';

import {
  imgLogoFacebook,
  imgLogoInstagram,
  imgLogoLinkedin,
  imgLogoLinktree,
  imgLogoThreads,
  imgLogoTiktok,
  imgLogoWattpad,
  imgLogoX,
} from '../../assets/Images';
import { sendEventGA } from '../../analytics';

function SocialLink({ link }) {
  function onClickLink(title) {
    sendEventGA({
      category: 'Social Link',
      action: `Click on social ${title || 'null'}`,
      label: link || 'null',
    });
  }

  return (
    <a href={link} target="_blank" rel="noreferrer">
      {(link.includes('www.facebook') || link.includes('facebook.com')) && (
        <img
          className="bookCard-social-brandmark"
          src={imgLogoFacebook}
          alt="Facebook"
          title="Facebook"
          onClick={() => onClickLink('Facebook')}
        />
      )}
      {(link.includes('www.instagram') || link.includes('instagram.com')) && (
        <img
          className="bookCard-social-brandmark"
          src={imgLogoInstagram}
          alt="Instagram"
          title="Instagram"
          onClick={() => onClickLink('Instagram')}
        />
      )}
      {(link.includes('www.linkedin') || link.includes('linkedin.com')) && (
        <img
          className="bookCard-social-brandmark"
          src={imgLogoLinkedin}
          alt="LinkedIn"
          title="LinkedIn"
          onClick={() => onClickLink('LinkedIn')}
        />
      )}
      {link.includes('linktr.ee') && (
        <img
          className="bookCard-social-brandmark bookCard-social-linktree"
          src={imgLogoLinktree}
          alt="Linktree"
          title="Linktree"
          onClick={() => onClickLink('Linktree')}
        />
      )}
      {(link.includes('www.threads') || link.includes('threads.com')) && (
        <img
          className="bookCard-social-brandmark"
          src={imgLogoThreads}
          alt="Threads"
          title="Threads"
          onClick={() => onClickLink('Threads')}
        />
      )}
      {(link.includes('www.tiktok') || link.includes('tiktok.com')) && (
        <img
          className="bookCard-social-brandmark"
          src={imgLogoTiktok}
          alt="TikTok"
          title="TikTok"
          onClick={() => onClickLink('TikTok')}
        />
      )}
      {(link.includes('www.wattpad') || link.includes('wattpad.com')) && (
        <img
          className="bookCard-social-brandmark"
          src={imgLogoWattpad}
          alt="Wattpad"
          title="Wattpad"
          onClick={() => onClickLink('Wattpad')}
        />
      )}
      {(link.includes('www.x') || link.includes('x.com')) && (
        <img
          className="bookCard-social-brandmark"
          src={imgLogoX}
          alt="X"
          title="X"
          onClick={() => onClickLink('X')}
        />
      )}
    </a>
  );
}

SocialLink.propTypes = {
  link: PropTypes.string.isRequired,
};

export default SocialLink;
