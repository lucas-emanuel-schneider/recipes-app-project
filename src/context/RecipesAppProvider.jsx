import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';
import mealsAPI from '../services/mealsAPI';
import drinksAPI from '../services/drinksAPI';

const MAX_RECIPES = 12;
const MAX_CATEGORIES = 5;

function RecipesAppProvider({ children }) {
  const [isSearching, setIsSearching] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [initialRecipes, setInitialRecipes] = useState([]);
  const [category, setCategory] = useState('meals');
  const [subCategories, setSubCategories] = useState([]);
  const [filter, setFilter] = useState('');
  const [recipeDetails, setRecipeDetails] = useState([]);

  const getFirstBatch = (array, lastElement = MAX_RECIPES) => (
    array && array.filter((recipe, index) => index < lastElement)
  );

  useEffect(() => {
    const getRecipes = async () => {
      const { fetchByName } = category === 'meals' ? mealsAPI : drinksAPI;
      const data = await fetchByName('');
      setRecipes(getFirstBatch(data));
      setInitialRecipes(getFirstBatch(data));
    };
    const getSubCategories = async () => {
      const { fetchCategories } = category === 'meals' ? mealsAPI : drinksAPI;
      const data = await fetchCategories();
      setSubCategories(getFirstBatch(data, MAX_CATEGORIES));
    };

    getRecipes();
    getSubCategories();
  }, [category]);

  const getFilteredRecipes = async (newFilter) => {
    if (filter === newFilter || !newFilter) {
      setFilter('');
      setRecipes(initialRecipes);
      return;
    }
    const { fetchByCategory } = category === 'meals' ? mealsAPI : drinksAPI;
    const data = await fetchByCategory(newFilter);
    setFilter(newFilter);
    setRecipes(getFirstBatch(data));
  };

  const getSearchRecipes = async (search) => {
    const { type, value } = search;
    const {
      fetchByIngredient,
      fetchByName,
      fetchByFirstLetter,
    } = category === 'meals' ? mealsAPI : drinksAPI;
    let data;

    switch (type) {
    case 'ingredient':
      data = await fetchByIngredient(value);
      break;
    case 'name':
      data = await fetchByName(value);
      break;
    case 'first-letter':
      data = await fetchByFirstLetter(value);
      break;
    // no default
    }

    if (!data) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setRecipes(getFirstBatch(data));
  };

  const toggleSearchBar = () => {
    setIsSearching((prevState) => !prevState);
  };

  const contextValue = {
    category,
    subCategories,
    isSearching,
    filter,
    recipes,
    recipeDetails,
    toggleSearchBar,
    setCategory,
    getSearchRecipes,
    getFilteredRecipes,
    setRecipeDetails,
  };

  return (
    <RecipesAppContext.Provider value={ contextValue }>
      {children}
    </RecipesAppContext.Provider>
  );
}

RecipesAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesAppProvider;
