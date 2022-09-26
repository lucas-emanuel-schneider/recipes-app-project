import React from 'react';
import Header from '../components/Header';

const headerTittle = 'Meals';

function Meals() {
  return (
    <div>
      <Header tittle={ headerTittle } isSearch />
    </div>
  );
}

export default Meals;
