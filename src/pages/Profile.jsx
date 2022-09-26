import React from 'react';
import Header from '../components/Header';

const headerTitle = 'Profile';

function Profile() {
  return (
    <div>
      <Header title={ headerTitle } isSearch={ false } />
    </div>
  );
}

export default Profile;
