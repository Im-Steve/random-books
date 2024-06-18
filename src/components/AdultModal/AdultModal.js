import React from 'react';
import PropTypes from 'prop-types';

import AcceptButton from '../Buttons/AcceptButton';
import CancelButton from '../Buttons/CancelButton';
import i18n from '../../i18n/i18n';
import Modal from '../Modal/Modal';
import { setDisplayAdultContent } from '../../func/handleSessionStorage';
import './adultModal.css';

function AdultModal({ visible, onClose }) {
  return (
    <Modal
      visible={visible}
      onClose={onClose}
    >
      <div className="adultModal">
        <p className="header-modal">{i18n.t('generalAttention')}</p>
        <p>{i18n.t('adultContentMessage1')}</p>
        <p>{i18n.t('adultContentMessage2')}</p>

        <div className="adultModal-bottom">
          <CancelButton onClick={onClose} />
          <AcceptButton
            text={i18n.t('adultContentAccept')}
            onClick={() => { setDisplayAdultContent(true); onClose(); }}
          />
        </div>
      </div>
    </Modal>
  );
}

AdultModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AdultModal;
