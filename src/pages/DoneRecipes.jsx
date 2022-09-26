import React from 'react';
import Header from '../components/Header';

const headerTitle = 'Done Recipes';

function DoneRecipes() {
  return (
    <div>
      <Header title={ headerTitle } isSearch={ false } />
    </div>
  );
}

export default DoneRecipes;
