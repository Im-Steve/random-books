import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ConfettiExplosion from 'react-confetti-explosion';

import { imgTigerEgg } from '../../assets/Images';
import { NAVBAR_HEIGHT } from '../../constants';
import './tigerEgg.css';

function TigerEgg({ onHold = false }) {
  const confettiTimerRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(!onHold);

    return () => {
      if (confettiTimerRef.current) {
        clearTimeout(confettiTimerRef.current);
      }
    };
  }, []);

  function restartConfetti() {
    setShowConfetti(false);

    confettiTimerRef.current = setTimeout(() => {
      setShowConfetti(true);
    }, 500);
  }

  return (
    <>
      <div className="tigerEgg">
        <img
          src={imgTigerEgg}
          alt="tiger-egg"
          style={{ animation: !onHold ? 'shine 1.5s infinite' : '' }}
        />
      </div>

      {showConfetti && (
        <>
          <ConfettiExplosion
            onComplete={() => restartConfetti()}
            style={{
              position: 'absolute',
              top: NAVBAR_HEIGHT,
              left: '25vw',
              with: '100vw',
              height: '100dvh',
            }}
          />
          <ConfettiExplosion
            style={{
              position: 'absolute',
              top: NAVBAR_HEIGHT,
              left: '50vw',
              with: '100vw',
              height: '100dvh',
            }}
          />
          <ConfettiExplosion
            style={{
              position: 'absolute',
              top: NAVBAR_HEIGHT,
              left: '75vw',
              with: '100vw',
              height: '100dvh',
            }}
          />
        </>
      )}
    </>
  );
}

TigerEgg.propTypes = {
  onHold: PropTypes.bool,
};

export default TigerEgg;
