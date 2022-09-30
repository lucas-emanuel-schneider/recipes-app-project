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
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilterClick('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => handleFilterClick('meal') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilterClick('drink') }
        >
          Drinks
        </button>
      </div>
      <div>
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
