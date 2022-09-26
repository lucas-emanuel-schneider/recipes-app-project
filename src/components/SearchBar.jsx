import React, { useState, useContext } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';

function SearchBar() {
  const { getSearchRecipes } = useContext(RecipesAppContext);
  const [formData, setFormData] = useState({
    value: '',
    type: 'ingredient',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getSearchRecipes(formData);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        name="value"
        data-testid="search-input"
        value={ formData.value }
        onChange={ handleChange }
      />
      <label htmlFor="ingredient-search-radio">
        <input
          type="radio"
          name="type"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          checked={ formData.type === 'ingredient' }
          value="ingredient"
          onChange={ handleChange }
        />
        Ingredient
      </label>
      <label htmlFor="name-search-radio">
        <input
          type="radio"
          name="type"
          id="name-search-radio"
          data-testid="name-search-radio"
          checked={ formData.type === 'name' }
          value="name"
          onChange={ handleChange }
        />
        Name
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          type="radio"
          name="type"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          checked={ formData.type === 'first-letter' }
          value="first-letter"
          onChange={ handleChange }
        />
        First letter
      </label>
      <button type="submit" data-testid="exec-search-btn">Search</button>
    </form>
  );
}

export default SearchBar;
