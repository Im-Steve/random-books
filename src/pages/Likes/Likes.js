import React from 'react';

import BooksNavbar from '../../components/BooksNavbar/BooksNavbar';
import LikesTab from '../../components/Tabs/LikesTab';
import './likes.css';

function Likes() {
  return (
    <>
      <div className="likes">
        <div>
          <LikesTab />
        </div>
      </div>

      <BooksNavbar left="home" />
    </>
  );
}

export default Likes;
