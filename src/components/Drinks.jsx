import React, { useContext, useEffect } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';
import {
  fetchDrinksByFirstLetter,
  fetchDrinksByIngredient,
  fetchDrinksByName,
} from '../services/cocktailsAPI';
import Header from './Header';

const headerTitle = 'Drinks';

function Drinks() {
  const { recipes, search, setRecipes } = useContext(RecipesAppContext);
  useEffect(() => {
    const updateRecipeList = async () => {
      let data;
      const { type, value } = search;
      switch (type) {
      case 'ingredient':
        data = await fetchDrinksByIngredient(value);
        break;
      case 'name':
        data = await fetchDrinksByName(value);
        break;
      case 'first-letter':
        data = await fetchDrinksByFirstLetter(value);
        break;
      default:
        setRecipes([]);
      }

      if (!data) global.alert('Sorry, we haven\'t found any recipes for these filters.');
      setRecipes(data);
    };
    updateRecipeList();
  }, [search]);

  return (
    <div>
      <Header title={ headerTitle } showSearchBtn />
    </div>
  );
}

export default Drinks;
