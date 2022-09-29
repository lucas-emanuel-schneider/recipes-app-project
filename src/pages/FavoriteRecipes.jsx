import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import RecipesAppContext from '../context/RecipesAppContext';

const headerTitle = 'Favorite Recipes';

function FavoriteRecipes() {
  const { favorites } = useContext(RecipesAppContext);
  return (
    <div>
      <Header title={ headerTitle } />
      <RecipesList recipes={ favorites } />
    </div>
  );
}

export default FavoriteRecipes;
