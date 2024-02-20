import React from 'react';
import PropTypes from 'prop-types';

import { imgLogoWattpadFull } from '../../assets/Images';

function SellerLink({ seller }) {
  return (
    <a href={seller} target="_blank" rel="noreferrer">
      {/* {seller.includes('www.leslibraires') && (
        'Les Libraires'
      )} */}
      {/* {seller.includes('www.amazon') && (
        'Amazon'
      )} */}
      {/* {seller.includes('www.archambault') && (
        'Archambault'
      )} */}
      {seller.includes('www.wattpad') && (
        <img
          className="bookCard-seller-logo bookCard-seller-wattpad"
          src={imgLogoWattpadFull}
          alt="Wattpad"
        />
      )}
    </a>
  );
}

SellerLink.propTypes = {
  seller: PropTypes.string.isRequired,
};

export default SellerLink;
