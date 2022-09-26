import React from 'react';
import Header from '../components/Header';

const headerTittle = 'Profile';

function Profile() {
  return (
    <div>
      <Header tittle={ headerTittle } isSearch={ false } />
    </div>
  );
}

export default Profile;
