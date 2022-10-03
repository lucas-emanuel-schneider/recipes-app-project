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
    <form
      className="m-3"
      onSubmit={ handleSubmit }
    >
      <div>
        <input
          placeholder="Search..."
          className="form-control mb-2"
          type="text"
          name="value"
          data-testid="search-input"
          value={ formData.value }
          onChange={ handleChange }
        />
      </div>
      <div
        className="mb-2"
      >
        <label
          className="form-check form-check-label form-check-inline"
          htmlFor="ingredient-search-radio"
        >
          <input
            className="form-check-input"
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
        <label
          className="form-check form-check-label form-check-inline"
          htmlFor="name-search-radio"
        >
          <input
            className="form-check-input"
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
        <label
          className="form-check form-check-label form-check-inline"
          htmlFor="first-letter-search-radio"
        >
          <input
            className="form-check-input"
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
      </div>
      <button
        className="btn btn-primary"
        type="submit"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
