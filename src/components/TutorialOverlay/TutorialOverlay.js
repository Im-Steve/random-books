import React from 'react';
import { useTranslation } from 'react-i18next';

import AcceptButton from '../Buttons/AcceptButton';
import Modal from '../Modal/Modal';
import { setTutorialDone } from '../../func/handleLocalStorage';
import './tutorialOverlay.css';

function TutorialOverlay() {
  const { t } = useTranslation();

  return (
    <Modal onClose={() => {}}>
      <div className="tutorialOverlay-section">
        <p className="tutorialOverlay-header">
          {t('tutorialHeader')}
        </p>

        <p className="tutorialOverlay-text">
          {t('tutorialText')}
        </p>

        <AcceptButton
          text={t('tutorialAccept')}
          onClick={() => { setTutorialDone(true); }}
        />
      </div>
    </Modal>
  );
}

export default TutorialOverlay;
