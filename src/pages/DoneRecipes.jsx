import React, { useContext } from 'react';
import Header from '../components/Header';
import UserRecipes from '../components/UserRecipes';
import RecipesAppContext from '../context/RecipesAppContext';

const headerTitle = 'Done Recipes';

function DoneRecipes() {
  const { doneRecipes } = useContext(RecipesAppContext);
  return (
    <div>
      <Header title={ headerTitle } />
      <UserRecipes recipes={ doneRecipes } />
    </div>
  );
}

export default DoneRecipes;
