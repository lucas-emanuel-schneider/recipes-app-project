import React from 'react';
import Header from '../components/Header';

const headerTittle = 'Drinks';

function Drinks() {
  return (
    <div>
      <Header tittle={ headerTittle } isSearch />
    </div>
  );
}

export default Drinks;
