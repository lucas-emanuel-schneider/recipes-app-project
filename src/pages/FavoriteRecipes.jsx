import React from 'react';
import Header from '../components/Header';

const headerTittle = 'Favorite Recipes';

function FavoriteRecipes() {
  return (
    <div>
      <Header tittle={ headerTittle } isSearch={ false } />
    </div>
  );
}

export default FavoriteRecipes;
