import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ tittle, isSearch }) {
  return (
    <div>
      <h1 data-testid="page-title">{ tittle }</h1>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="profile" />
      { isSearch && <img data-testid="search-top-btn" src={ searchIcon } alt="" /> }
    </div>
  );
}

Header.propTypes = {
  tittle: PropTypes.string.isRequired,
  isSearch: PropTypes.bool.isRequired,
};

export default Header;
