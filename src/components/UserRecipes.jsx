import { instanceOf } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import UserRecipeCard from './UserRecipeCard';

function UserRecipes({ recipes }) {
  const [filter, setFilter] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const { pathname } = useLocation();
  const inFavoritesPage = pathname.includes('favorite');

  useEffect(() => {
    setFilteredRecipes(
      recipes
        .filter(({ type }) => type.includes(filter)),
    );
  }, [recipes, filter]);

  const handleFilterClick = (clicked) => {
    const newFilter = clicked === filter ? '' : clicked;
    setFilter(newFilter);
  };

  return (
    <div>
      <div
        className="btn-group d-flex justify-content-center m-3"
      >
        <button
          className="btn btn-outline-primary"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilterClick('') }
        >
          All
        </button>
        <button
          className="btn btn-outline-primary"
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => handleFilterClick('meal') }
        >
          Meals
        </button>
        <button
          className="btn btn-outline-primary"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilterClick('drink') }
        >
          Drinks
        </button>
      </div>
      <div
        className="d-flex flex-row flex-wrap m-3 justify-content-between"
      >
        {filteredRecipes.map((recipe, index) => (
          <UserRecipeCard
            key={ index }
            index={ index }
            recipe={ recipe }
            inFavoritesPage={ inFavoritesPage }
          />
        ))}
      </div>
    </div>
  );
}

UserRecipes.propTypes = {
  recipes: instanceOf(Array),
}.isRequired;

export default UserRecipes;
