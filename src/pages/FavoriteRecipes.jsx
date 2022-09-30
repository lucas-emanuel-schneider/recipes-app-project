import React, { useContext } from 'react';
import Header from '../components/Header';
import UserRecipes from '../components/UserRecipes';
import RecipesAppContext from '../context/RecipesAppContext';

const headerTitle = 'Favorite Recipes';

function FavoriteRecipes() {
  const { favorites } = useContext(RecipesAppContext);
  return (
    <div>
      <Header title={ headerTitle } />
      <UserRecipes recipes={ favorites } />
    </div>
  );
}

export default FavoriteRecipes;
