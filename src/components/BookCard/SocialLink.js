import React from 'react';
import PropTypes from 'prop-types';

import {
  imgLogoFacebook,
  imgLogoInstagram,
  imgLogoLinkedin,
  imgLogoThreads,
  imgLogoTiktok,
  imgLogoWattpad,
  imgLogoX,
} from '../../assets/Images';

function SocialLink({ link }) {
  return (
    <a href={link} target="_blank" rel="noreferrer">
      {link.includes('www.facebook') && (
        <img
          className="bookCard-social-logo"
          src={imgLogoFacebook}
          alt="Facebook"
          title="Facebook"
        />
      )}
      {link.includes('www.instagram') && (
        <img
          className="bookCard-social-logo"
          src={imgLogoInstagram}
          alt="Instagram"
          title="Instagram"
        />
      )}
      {link.includes('www.linkedin') && (
        <img
          className="bookCard-social-logo"
          src={imgLogoLinkedin}
          alt="LinkedIn"
          title="LinkedIn"
        />
      )}
      {link.includes('www.threads') && (
        <img
          className="bookCard-social-logo"
          src={imgLogoThreads}
          alt="Threads"
          title="Threads"
        />
      )}
      {link.includes('www.tiktok') && (
        <img
          className="bookCard-social-logo"
          src={imgLogoTiktok}
          alt="TikTok"
          title="TikTok"
        />
      )}
      {link.includes('www.wattpad') && (
        <img
          className="bookCard-social-logo"
          src={imgLogoWattpad}
          alt="Wattpad"
          title="Wattpad"
        />
      )}
      {link.includes('www.x') && (
        <img
          className="bookCard-social-logo"
          src={imgLogoX}
          alt="X"
          title="X"
        />
      )}
    </a>
  );
}

SocialLink.propTypes = {
  link: PropTypes.string.isRequired,
};

export default SocialLink;
