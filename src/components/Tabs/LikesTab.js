import React, { useEffect, useRef, useState } from 'react';

import { downloadLikedBooks, uploadLikedBooks } from '../../func/transfertLikes';
import { getArrayOfLikedBooks } from '../../func/handleLocalStorage';
import i18n from '../../i18n/i18n';
import ListOfLikes from '../ListOfLikes/ListOfLikes';
import './tabs.css';

function LikesTab() {
  const [likedBooks, setLikedBooks] = useState(getArrayOfLikedBooks());
  const uploadInputRef = useRef(null);

  useEffect(() => {
    function handleStorageChange() {
      setLikedBooks(getArrayOfLikedBooks());
    }
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  function upload(event) {
    uploadLikedBooks(event);
    uploadInputRef.current.value = null;
  }

  return (
    <>
      <h1 className="tab-h1">
        {i18n.t('likesHeader')}
        <p>{` (${likedBooks.length})`}</p>
      </h1>

      <div className="tab-subheader">
        <p className="tab-info">{i18n.t('likesInfo')}</p>
        <div className="tab-likes-actions">
          <p>⬇️</p>
          <p className="action" onClick={downloadLikedBooks}>{i18n.t('generalDownload')}</p>
          <p className="tab-actions-middle">|</p>
          <label className="action">
            {i18n.t('generalUpload')}
            <input
              type="file"
              onChange={upload}
              ref={uploadInputRef}
              className="input-file-custom"
            />
          </label>
          <p>⬆️</p>
        </div>
      </div>

      <div className="tab-likes">
        <ListOfLikes />
      </div>
    </>
  );
}

export default LikesTab;
