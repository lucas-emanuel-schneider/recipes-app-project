import React from 'react';
import Header from './Header';

const headerTitle = 'Meals';

function Meals() {
  return (
    <div>
      <Header title={ headerTitle } isSearch />
    </div>
  );
}

export default Meals;
