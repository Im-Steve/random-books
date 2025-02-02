import React from 'react';
import { useTranslation } from 'react-i18next';

import { EmailIcon } from '../../assets/Icons';
import { imgLogoLinktree } from '../../assets/Images';
import { sendEventGA } from '../../analytics';
import { TIGER_EMAIL, TIGER_LINK } from '../../constants';
import './footer.css';

function Footer() {
  const { t } = useTranslation();

  function onClickFooter() {
    sendEventGA({
      category: 'Navigation',
      action: 'Click on creator link in a page',
      label: 'Link in a page footer',
    });
  }

  return (
    <div className="section footer">
      <p>
        {t('footer1')}
        <a
          href={TIGER_LINK}
          target="_blank"
          rel="noreferrer"
          onClick={onClickFooter}
        >
          {t('footer2')}
        </a>
        {t('footer3')}
      </p>

      <div className="footer-links">
        <a
          className="footer-links-icon"
          href={`mailto:${TIGER_EMAIL}`}
          onClick={onClickFooter}
        >
          <EmailIcon />
        </a>
        <a
          href={TIGER_LINK}
          target="_blank"
          rel="noreferrer"
          onClick={onClickFooter}
        >
          <img
            className="footer-links-linktree"
            src={imgLogoLinktree}
            alt="Linktree"
          />
        </a>
      </div>
    </div>
  );
}

export default Footer;
