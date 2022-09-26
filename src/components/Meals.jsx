import React, { useContext, useEffect } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';
import {
  fetchMealsByFirstLetter,
  fetchMealsByIngredient,
  fetchMealsByName,
} from '../services/mealsAPI';
import Header from './Header';

const headerTitle = 'Meals';

function Meals() {
  const { recipes, setRecipes, search } = useContext(RecipesAppContext);

  useEffect(() => {
    const updateRecipeList = async () => {
      let data;
      const { type, value } = search;
      switch (type) {
      case 'ingredient':
        data = await fetchMealsByIngredient(value);
        break;
      case 'name':
        data = await fetchMealsByName(value);
        break;
      case 'first-letter':
        data = await fetchMealsByFirstLetter(value);
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

export default Meals;
