import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// import getLanguage from '../../i18n/getLanguage';
// import SellerAd from './SellerAd';
import SellerLink from './SellerLink';
import './bookCard.css';

function SellersSection({ book = {} }) {
  const { t } = useTranslation();

  return (
    Array.isArray(book.sellers)
    && book.sellers.length > 0
    && book.sellers[0].title
    && (!book.sellers.some((i) => i.title.toLowerCase().includes('amazon')) || book.ASIN)
    && (
      <div className="section bookCard-sellers">
        <h2>{t('bookHeaderSellers')}</h2>

        {book.sellers.map((seller) => (
          <SellerLink seller={seller} key={seller.link} />
        ))}

        {/* {!book.sellers[0].link.includes('www.wattpad')
          && getLanguage().includes('fr') && (<SellerAd />)} */}
      </div>
    )
  );
}

SellersSection.propTypes = {
  book: PropTypes.shape({
    sellers: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

export default SellersSection;
