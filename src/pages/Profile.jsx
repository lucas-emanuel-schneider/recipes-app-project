import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const headerTitle = 'Profile';

function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();
  useEffect(() => {
    const emailStorage = localStorage.getItem('user');
    const response = JSON.parse(emailStorage);
    setEmail(response.email);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <div>
      <Header title={ headerTitle } isSearch={ false } />
      <p data-testid="profile-email">
        {' '}
        { email }
      </p>
      <Link to="/done-recipes">
        <button
          data-testid="profile-done-btn"
          type="button"
        >
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          data-testid="profile-favorite-btn"
          type="button"
        >
          Favorite Recipes
        </button>
      </Link>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ handleLogout }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
