import React, { useState } from 'react';
import copy from 'clipboard-copy';
// import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const [showSpan, setShowSpan] = useState(false);
  // const { pathname } = useLocation();

  const handleShareClick = () => {
    setShowSpan(true);
    copy(window.location.href);
  };

  return (
    <div>
      <img
        role="presentation"
        data-testid="share-btn"
        src={ shareIcon }
        alt="Share button icon"
        onClick={ handleShareClick }
      />
      {showSpan && <span>Link copied!</span>}
    </div>
  );
}

export default ShareButton;
