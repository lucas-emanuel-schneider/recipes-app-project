import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { string } from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ link }) {
  const [showSpan, setShowSpan] = useState(false);

  const handleShareClick = () => {
    setShowSpan(true);
    copy(link || window.location.href.replace('/in-progress', ''));
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

ShareButton.defaultProps = {
  link: '',
};

ShareButton.propTypes = {
  link: string,
};

export default ShareButton;
