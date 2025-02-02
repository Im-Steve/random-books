import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { downloadLikedBooks, uploadLikedBooks } from '../../func/transfertLikes';
import { getLikedBooks } from '../../func/handleLocalStorage';
import ListOfLikes from '../ListOfLikes/ListOfLikes';
import './tabs.css';

function LikesTab({
  onClose = () => {},
  forTab = true,
  isVisible = true,
}) {
  const { t } = useTranslation();

  const [nbLikedBooks, setNbLikedBooks] = useState(0);
  const uploadInputRef = useRef(null);

  useEffect(() => {
    function handleStorageChange() {
      const likedBooks = getLikedBooks();
      if (Array.isArray(likedBooks)) {
        setNbLikedBooks(likedBooks.length);
      }
    }

    if (isVisible) {
      handleStorageChange();
      window.addEventListener('storage', handleStorageChange);
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isVisible]);

  function upload(event) {
    uploadLikedBooks(event);
    uploadInputRef.current.value = null;
  }

  return (
    <>
      <h1 className="tab-h1">
        {t('likesHeader')}
        <p>{` (${nbLikedBooks})`}</p>
      </h1>

      <div className="tab-subheader">
        <p className="tab-info">{t('likesInfo')}</p>
        <div className="tab-likes-actions">
          <p>⬇️</p>
          <p className="action" onClick={downloadLikedBooks}>{t('buttonDownload')}</p>
          <p className="tab-actions-middle">|</p>
          <label className="action" htmlFor="tab-likes-upload">
            {t('buttonUpload')}
            <input
              type="file"
              onChange={upload}
              ref={uploadInputRef}
              className="input-file-custom"
              id="tab-likes-upload"
            />
          </label>
          <p>⬆️</p>
        </div>
      </div>

      <div className="tab-likes">
        <ListOfLikes
          onGoBook={onClose}
          forTab={forTab}
          isVisible={isVisible}
        />
      </div>
    </>
  );
}

LikesTab.propTypes = {
  onClose: PropTypes.func,
  forTab: PropTypes.bool,
  isVisible: PropTypes.bool,
};

export default LikesTab;
