import React from 'react';

import BackButton from '../../components/Buttons/BackButton';
import BooksNavbar from '../../components/BooksNavbar/BooksNavbar';
import LikesTab from '../../components/Tabs/LikesTab';
import { sendPageViewGA } from '../../analytics';
import './likes.css';

function Likes() {
  sendPageViewGA();

  return (
    <>
      <BooksNavbar left="home" />

      <div className="likes">
        <div>
          <BackButton mode="dark" className="button-back-likes" />
          <LikesTab forTab={false} isVisible />
        </div>
      </div>
    </>
  );
}

export default Likes;
