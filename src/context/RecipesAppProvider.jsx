import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';
import mealsAPI from '../services/mealsAPI';
import drinksAPI from '../services/drinksAPI';

const MAX_RECIPES = 12;

function RecipesAppProvider({ children }) {
  const [isSearching, setIsSearching] = useState(false);
  // const [search, setSearch] = useState({
  //   value: '',
  //   type: '',
  // });
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState('meals');
  // const [filteredRecipes, setFilteredRecipes] = useState([]);

  const getFirstBatch = (array) => (
    array && array.filter((recipe, index) => index < MAX_RECIPES)
  );

  useEffect(() => {
    const getRecipes = async () => {
      const { fetchByName } = category === 'meals' ? mealsAPI : drinksAPI;
      const data = await fetchByName('');
      setRecipes(getFirstBatch(data));
    };
    getRecipes();
  }, [category]);

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
    // setFilteredRecipes(data);

    if (!data) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setRecipes(getFirstBatch(data));
  };

  const toggleSearchBar = () => {
    setIsSearching((prevState) => !prevState);
  };

  const contextValue = {
    isSearching,
    // search,
    recipes,
    // filteredRecipes,
    setCategory,
    // getRecipes,
    getSearchRecipes,
    // setSearch,
    toggleSearchBar,
    category,
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
