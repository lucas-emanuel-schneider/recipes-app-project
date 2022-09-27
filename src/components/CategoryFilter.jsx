import React, { useContext } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';

function CategoryFilter() {
  const { subCategories, getFilteredRecipes } = useContext(RecipesAppContext);

  const handleFilterClick = (category) => {
    getFilteredRecipes(category);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleFilterClick('') }
      >
        All
      </button>
      {subCategories && subCategories.map((category, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${category}-category-filter` }
          onClick={ () => handleFilterClick(category) }
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
