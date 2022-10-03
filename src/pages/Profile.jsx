import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const headerTitle = 'Profile';

function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user'))) {
      localStorage.setItem('user', JSON.stringify({ email: '' }));
    }
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
      <Header title={ headerTitle } />
      <h1
        className="text-center"
        data-testid="profile-email"
      >
        { email }
      </h1>
      <div
        className="d-grid gap-2 col-6 mx-auto"
      >
        <Link to="/done-recipes">
          <button
            className="btn btn-primary w-100"
            data-testid="profile-done-btn"
            type="button"
          >
            Done Recipes
          </button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            className="btn btn-primary w-100"
            data-testid="profile-favorite-btn"
            type="button"
          >
            Favorite Recipes
          </button>
        </Link>
        <button
          className="btn btn-primary"
          data-testid="profile-logout-btn"
          type="button"
          onClick={ handleLogout }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
