import React from 'react';
import Header from '../components/Header';

const headerTittle = 'Done Recipes';

function DoneRecipes() {
  return (
    <div>
      <Header tittle={ headerTittle } isSearch={ false } />
    </div>
  );
}

export default DoneRecipes;
