import React, { useEffect, useState } from 'react';

import { downloadLikedBooks, uploadLikedBooks } from '../../func/transfertLikes';
import { getArrayOfLikedBooks } from '../../func/handleLocalStorage';
import i18n from '../../i18n/i18n';
import ListOfLikes from '../ListOfLikes/ListOfLikes';
import './tabs.css';

function LikesTab() {
  const [likedBooks, setLikedBooks] = useState([]);

  useEffect(() => {
    function handleStorageChange() {
      setLikedBooks(getArrayOfLikedBooks());
    }

    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      <h1 className="tab-h1">
        {i18n.t('headerLikes')}
        <p>{` (${likedBooks.length})`}</p>
      </h1>

      <div className="tab-subheader">
        <p className="tab-info">{i18n.t('messageForLikes')}</p>
        <div className="tab-likes-action">
          <p>⬇️</p>
          <p className="action" onClick={downloadLikedBooks}>{i18n.t('download')}</p>
          <p className="tab-action-middle">|</p>
          <label className="action">
            {i18n.t('upload')}
            <input
              type="file"
              onChange={uploadLikedBooks}
              className="custom-file-input"
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
