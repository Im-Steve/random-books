import React from 'react';

import BookForm from '../BookForm/BookForm';
import i18n from '../../i18n/i18n';
import './tabs.css';

function OptionsTab() {
  return (
    <>
      <h1 className="tab-h1">{i18n.t('headerFilter')}</h1>
      <div className="tab-content">
        <BookForm />
      </div>
    </>
  );
}

export default OptionsTab;
