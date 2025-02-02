import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import isSafari from './func/isSafari';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (isSafari()) {
      document.documentElement.scrollTop = -50;
      document.body.scrollTop = -50;
    } else {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    // Force to recalculate the position of the elements
    document.documentElement.style.display = 'none';
    // eslint-disable-next-line
    document.documentElement.offsetHeight;
    document.documentElement.style.display = '';
  }, [pathname]);

  return null;
}

export default ScrollToTop;
