import React from 'react';

// import { imgLogoWebsite } from '../../assets/Images';

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
        {/* <img
          src={imgLogoWebsite}
          alt="seller"
          style={{
            width: '50px',
            height: 'auto',
            filter: 'grayscale(100%)',
            marginRight: '10px',
          }}
        /> */}
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
          margin: '-5px 0px 12px 0px',
        }}
      >
        *Bookyverse est à la recherche de marchands souhaitant contribuer au projet.
      </p>
    </>
  );
}

export default SellerAd;
