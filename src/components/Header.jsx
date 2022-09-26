import React from 'react';
import { string, bool } from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, isSearch }) {
  const history = useHistory();

  const handleProfileClick = () => {
    history.push('/profile');
  };

  return (
    <div>
      <h1 data-testid="page-title">{ title }</h1>
      <img
        role="presentation"
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="profile"
        onClick={ handleProfileClick }
      />
      { isSearch && <img data-testid="search-top-btn" src={ searchIcon } alt="" /> }
    </div>
  );
}

Header.propTypes = {
  title: string,
  isSearch: bool,
}.isRequired;

export default Header;
