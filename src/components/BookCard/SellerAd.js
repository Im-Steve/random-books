import React from 'react';

import { imgLogoWebsite } from '../../assets/Images';

function SellerAd() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <img
          src={imgLogoWebsite}
          alt="seller"
          style={{
            width: '50px',
            height: 'auto',
            filter: 'grayscale(100%)',
            marginRight: '10px',
          }}
        />
        <p
          style={{
            color: 'gray',
          }}
        >
          Votre entreprise ici*
        </p>
      </div>

      <p
        style={{
          fontSize: '16px',
          marginLeft: '10px',
        }}
      >
        *Bookyverse est à la recherche de libraires souhaitant contribuer au projet.
      </p>
    </>
  );
}

export default SellerAd;
