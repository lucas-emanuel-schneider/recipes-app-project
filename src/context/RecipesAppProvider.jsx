import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState({
    value: '',
    type: '',
  });
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState('meals');

  const toggleSearchBar = () => {
    setIsSearching((prevState) => !prevState);
  };

  const contextValue = {
    isSearching,
    search,
    recipes,
    setRecipes,
    setSearch,
    toggleSearchBar,
    setCategory,
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
