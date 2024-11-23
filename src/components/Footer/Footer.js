import React from 'react';
import { useTranslation } from 'react-i18next';

import { sendEventGA } from '../../analytics';
import { TIGER_LINK } from '../../constants';
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
      </p>
    </div>
  );
}

export default Footer;
