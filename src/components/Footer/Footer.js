import React from 'react';

import i18n from '../../i18n/i18n';
import './footer.css';

function Footer() {
  return (
    <div className="footer">
      <p>
        {i18n.t('footer1')}
        <a href="https://www.linkedin.com/in/le-tigre-noir-8339342a5/" target="_blank" rel="noreferrer">
          {i18n.t('footer2')}
        </a>
        {i18n.t('footer3')}
      </p>
    </div>
  );
}

export default Footer;
