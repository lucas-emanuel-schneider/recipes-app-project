import React from 'react';
import Header from './Header';

const headerTitle = 'Drinks';

function Drinks() {
  return (
    <div>
      <Header title={ headerTitle } isSearch />
    </div>
  );
}

export default Drinks;
