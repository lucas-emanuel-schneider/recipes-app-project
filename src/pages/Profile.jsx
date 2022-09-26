import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const headerTitle = 'Profile';

function Profile() {
  return (
    <div>
      <Header title={ headerTitle } isSearch={ false } />
      <Footer />
    </div>
  );
}

export default Profile;
