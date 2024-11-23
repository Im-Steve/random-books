import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import BookForm from '../BookForm/BookForm';
import { LanguageIcon } from '../../assets/Icons';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import './tabs.css';

function FilterTab({ onClose = () => {} }) {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="tab-h1">{t('filterHeader')}</h1>
      <div className="tab-language">
        <LanguageIcon className="language-select-icon" />
        <LanguageSelect />
      </div>
      <div className="tab-content">
        <BookForm onSearch={onClose} />
      </div>
    </>
  );
}

FilterTab.propTypes = {
  onClose: PropTypes.func,
};

export default FilterTab;
