import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import getLanguage from '../../i18n/getLanguage';
import i18n from '../../i18n/i18n';
import './languageSelect.css';

function LanguageSelect() {
  const uniqueId = uuidv4();
  const [language, setLanguage] = useState(getLanguage());

  useEffect(() => {
    const handleLanguageChange = (lang) => {
      setLanguage(lang.split('-')[0]);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  function handleLanguageSelect(event) {
    const url = new URL(window.location.href);
    url.searchParams.delete('lang');
    window.history.replaceState({}, document.title, url);

    i18n.changeLanguage(event.target.value);
  }

  return (
    <select
      className="language-select"
      value={language}
      onChange={handleLanguageSelect}
      id={uniqueId}
    >
      <option value="en">English</option>
      <option value="fr">Français</option>
    </select>
  );
}

export default LanguageSelect;
