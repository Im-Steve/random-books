import React from 'react';

import i18n from '../../i18n/i18n';
import { TIGER_LINK } from '../../constants';
import './footer.css';

function Footer() {
  return (
    <div className="footer">
      <p>
        {i18n.t('footer1')}
        <a href={TIGER_LINK} target="_blank" rel="noreferrer">
          {i18n.t('footer2')}
        </a>
      </p>
    </div>
  );
}

export default Footer;
