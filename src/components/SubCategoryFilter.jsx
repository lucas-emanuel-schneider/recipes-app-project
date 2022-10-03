import React, { useContext } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';

function SubCategoryFilter() {
  const { subCategories, getFilteredRecipes } = useContext(RecipesAppContext);

  const handleFilterClick = (category) => {
    getFilteredRecipes(category);
  };

  return (
    <div
      className="d-flex m-2 flex-wrap flex-row"
    >
      <button
        className="btn btn-outline-primary flex-grow-1"
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleFilterClick('') }
      >
        All
      </button>
      {subCategories.map((category, index) => (
        <button
          className="btn btn-outline-primary flex-grow-1"
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

export default SubCategoryFilter;
