import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import AcceptButton from '../Buttons/AcceptButton';
import CloseButton from '../Buttons/CloseButton';
import Modal from '../Modal/Modal';
import { setDisplayAdultContent } from '../../func/handleSessionStorage';
import './adultModal.css';

function AdultModal({ onClose, onRefuse = () => {} }) {
  const { t } = useTranslation();

  return (
    <Modal onClose={() => { onClose(); onRefuse(); }}>
      <div className="modal modal-adult">
        <p className="modal-header">{t('generalAttention')}</p>
        <p>{t('adultContentMessage1')}</p>
        <p>{t('adultContentMessage2')}</p>

        <div className="modal-bottom">
          <CloseButton onClick={() => { onClose(); onRefuse(); }} text={t('buttonCancel')} />
          <AcceptButton
            text={t('adultContentAccept')}
            onClick={() => { setDisplayAdultContent(true); onClose(); }}
          />
        </div>
      </div>
    </Modal>
  );
}

AdultModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onRefuse: PropTypes.func,
};

export default AdultModal;
