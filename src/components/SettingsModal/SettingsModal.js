import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-switch';
import { useTranslation } from 'react-i18next';

import CloseButton from '../Buttons/CloseButton';
import { createConsentCookie, hasCookieConsent, deleteAllCookies } from '../../analytics';
import { getDisplayAdultContent, setDisplayAdultContent } from '../../func/handleSessionStorage';
import getLanguage from '../../i18n/getLanguage';
import { getTutorialDone, setTutorialDone } from '../../func/handleLocalStorage';
import i18n from '../../i18n/i18n';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import Modal from '../Modal/Modal';
import SaveButton from '../Buttons/SaveButton';
import { SWITCH_HEIGHT, SWITCH_HANDLEDIAMETER } from '../../constants';
import './settingsModal.css';

function SettingsModal({ onClose }) {
  const { t } = useTranslation();

  const [cookieConsent] = useState(hasCookieConsent());
  const [modifiedCookieConsent, setModifiedCookieConsent] = useState(hasCookieConsent());
  const [adultContent] = useState(getDisplayAdultContent());
  const [modifiedAdultContent, setModifiedAdultContent] = useState(getDisplayAdultContent());
  const [tutorial] = useState(!getTutorialDone());
  const [modifiedTutorial, setModifiedTutorial] = useState(!getTutorialDone());
  const [language] = useState(getLanguage());
  const [modifiedLanguage, setModifiedLanguage] = useState(getLanguage());

  useEffect(() => {
    const handleLanguageChange = (lang) => {
      setModifiedLanguage(lang);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  function handleSave() {
    if (modifiedCookieConsent !== cookieConsent) {
      if (modifiedCookieConsent) {
        createConsentCookie();
      } else {
        deleteAllCookies();
      }
    }

    if (modifiedAdultContent !== adultContent) {
      setDisplayAdultContent(modifiedAdultContent);
    }

    if (modifiedTutorial !== tutorial) {
      setTutorialDone(!modifiedTutorial);
    }

    onClose();
  }

  function handleCancel() {
    if (modifiedLanguage !== language) {
      i18n.changeLanguage(language);
    }
    onClose();
  }

  return (
    <Modal onClose={() => handleCancel()}>
      <div className="modal modal-settings">
        <p className="modal-header">{t('settingsHeader')}</p>

        <div className="settings-section">
          <label className="settings-param-name" htmlFor="settings-cookies">
            {t('settingsCookieConsent')}
          </label>
          <Switch
            checked={modifiedCookieConsent}
            onChange={() => { setModifiedCookieConsent(!modifiedCookieConsent); }}
            height={SWITCH_HEIGHT}
            handleDiameter={SWITCH_HANDLEDIAMETER}
            id="settings-cookies"
          />
        </div>

        <div className="settings-section">
          <label className="settings-param-name" htmlFor="settings-adult">
            {t('settingsAdultContent')}
          </label>
          <Switch
            checked={modifiedAdultContent}
            onChange={() => setModifiedAdultContent(!modifiedAdultContent)}
            height={SWITCH_HEIGHT}
            handleDiameter={SWITCH_HANDLEDIAMETER}
            id="settings-adult"
          />
        </div>

        <div className="settings-section">
          <label className="settings-param-name" htmlFor="settings-tutorial">
            {t('settingsTutorial')}
          </label>
          <Switch
            checked={modifiedTutorial}
            onChange={() => setModifiedTutorial(!modifiedTutorial)}
            height={SWITCH_HEIGHT}
            handleDiameter={SWITCH_HANDLEDIAMETER}
            id="settings-tutorial"
          />
        </div>

        <div className="settings-section">
          <p className="settings-param-name">{t('settingsLanguage')}</p>
          <LanguageSelect />
        </div>

        <div className="modal-bottom">
          <CloseButton onClick={() => handleCancel()} text={t('buttonCancel')} />
          <SaveButton onClick={() => handleSave()} />
        </div>
      </div>
    </Modal>
  );
}

SettingsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SettingsModal;
