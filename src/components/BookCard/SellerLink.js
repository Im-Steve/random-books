import React from 'react';
import PropTypes from 'prop-types';

import { imgLogoWattpadFull } from '../../assets/Images';
import { sendEventGA } from '../../analytics';

function SellerLink({ seller = {} }) {
  function onClickSeller() {
    sendEventGA({
      category: 'Seller Link',
      action: `Click on seller ${seller.title || 'null'}`,
      label: seller.link || 'null',
    });
  }

  if (seller.link.includes('www.wattpad') || seller.link.includes('wattpad.com')) {
    return (
      <div>
        <a
          href={seller.link}
          target="_blank"
          rel="noreferrer"
          onClick={onClickSeller}
        >
          <img
            className="bookCard-seller-brandmark"
            src={imgLogoWattpadFull}
            alt="Wattpad"
          />
        </a>
      </div>
    );
  }

  return (
    <div className="bookCard-seller-name">
      <a
        href={seller.link}
        target="_blank"
        rel="noreferrer"
        onClick={onClickSeller}
      >
        {seller.title}
      </a>
    </div>
  );
}

SellerLink.propTypes = {
  seller: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
};

export default SellerLink;
