import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../i18n/i18n';
// import SellerAd from './SellerAd';
import SellerLink from './SellerLink';
import './bookCard.css';

function SellersSection({ book = {} }) {
  return (
    Array.isArray(book.sellers)
    && book.sellers.length > 0
    && book.sellers.some((seller) => seller.includes('www.wattpad')) && (
      <div className="bookCard-section bookCard-sellers">
        <h2>{i18n.t('bookHeaderSellers')}</h2>

        {book.sellers.map((seller) => (
          <div key={seller}>
            <SellerLink seller={seller} />
          </div>
        ))}

        {/* {!book.sellers.some((seller) => seller.includes('www.wattpad')) && (<SellerAd />)} */}
      </div>
    )
  );
}

SellersSection.propTypes = {
  book: PropTypes.shape({
    sellers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default SellersSection;
