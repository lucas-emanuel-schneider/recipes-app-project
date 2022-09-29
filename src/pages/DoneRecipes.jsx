import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';
import RecipesAppContext from '../context/RecipesAppContext';

const headerTitle = 'Done Recipes';

function DoneRecipes() {
  const { doneRecipes } = useContext(RecipesAppContext);
  return (
    <div>
      <Header title={ headerTitle } />
      <RecipesList recipes={ doneRecipes } />
    </div>
  );
}

export default DoneRecipes;
