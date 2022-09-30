import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';
import mealsAPI from '../services/mealsAPI';
import drinksAPI from '../services/drinksAPI';
import { loadFavorites, saveFavorites } from '../services/favoritesStorage';
import { loadDoneRecipes, saveDoneRecipes } from '../services/doneRecipesStorage';
import { loadProgressRecipes, saveProgressRecipes } from '../services/inProgressStorage';

const MAX_RECIPES = 12;
const MAX_CATEGORIES = 5;

function RecipesAppProvider({ children }) {
  const [isSearching, setIsSearching] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [initialRecipes, setInitialRecipes] = useState([]);
  const [category, setCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [filter, setFilter] = useState('');
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [favorites, setFavorites] = useState(loadFavorites());
  const [doneRecipes, setDoneRecipes] = useState(loadDoneRecipes());
  const [inProgressRecipes, setInProgressRecipes] = useState(loadProgressRecipes());
  const [checkList, setCheckList] = useState([]);

  const getFirstBatch = (array, lastElement = MAX_RECIPES) => (
    array && array.slice(0, lastElement)
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
    if (category) {
      getRecipes();
      getSubCategories();
    }
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
    console.log('getFilteredRecipes');
  };

  const getSearchRecipes = async (search) => {
    const { type, value } = search;
    const {
      fetchByIngredient,
      fetchByName,
      fetchByFirstLetter,
    } = category === 'meals' ? mealsAPI : drinksAPI;

    let data;
    // let invalidSearch = false;

    switch (type) {
    case 'ingredient':
      data = await fetchByIngredient(value);
      break;
    case 'name':
      data = await fetchByName(value);
      break;
    case 'first-letter':
      if (value.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
        // invalidSearch = true;
      }
      data = await fetchByFirstLetter(value);

      break;
    // no default
    }

    if (!data) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setRecipes(getFirstBatch(data));
    console.log('getSearchRecipes');
  };

  const toggleSearchBar = () => {
    setIsSearching((prevState) => !prevState);
  };

  const toggleFavorite = (recipe) => {
    const { id } = recipe;
    const isFavorite = favorites.some((favorite) => id === favorite.id);
    let newFavorites;
    switch (isFavorite) {
    case true:
      newFavorites = favorites.filter((favorite) => id !== favorite.id);
      break;
    default:
      newFavorites = [...favorites, recipe];
      break;
    }
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
    console.log('toggleFavorite');
  };

  const setCurrentCheckList = (id, isMeal) => {
    const type = isMeal ? 'meals' : 'drinks';
    setCheckList(inProgressRecipes[type][id] || []);
  };

  const updateInProgress = (isMeal, id, ingredient) => {
    const type = isMeal ? 'meals' : 'drinks';
    const cloneRecipes = { ...inProgressRecipes };
    const haveIngredient = cloneRecipes[type][id]
    && cloneRecipes[type][id].includes(ingredient);
    if (haveIngredient) {
      cloneRecipes[type][id] = cloneRecipes[type][id]
        .filter((ing) => ing !== ingredient);
    } else {
      if (!cloneRecipes[type][id]) cloneRecipes[type][id] = [];
      cloneRecipes[type][id].push(ingredient);
    }
    setInProgressRecipes(cloneRecipes);
    saveProgressRecipes(cloneRecipes);
    setCurrentCheckList(id, isMeal);
  };

  const saveDoneRecipe = (recipe) => {
    const alreadyDone = doneRecipes.some(({ id }) => id === recipe.id);
    if (!alreadyDone) {
      const newDoneRecipes = [...doneRecipes, recipe];
      setDoneRecipes(newDoneRecipes);
      saveDoneRecipes(newDoneRecipes);
    }
  };

  const contextValue = {
    category,
    subCategories,
    isSearching,
    filter,
    recipes,
    recipeDetails,
    favorites,
    toggleSearchBar,
    setCategory,
    getSearchRecipes,
    getFilteredRecipes,
    setRecipeDetails,
    getFirstBatch,
    toggleFavorite,
    saveDoneRecipe,
    doneRecipes,
    setCurrentCheckList,
    setDoneRecipes,
    inProgressRecipes,
    updateInProgress,
    checkList,
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
