import React, { useState, useContext, useEffect } from 'react';
import Header from '../components/Header';
import RecipesAppContext from '../context/RecipesAppContext';
import ShareButton from '../components/ShareButton';

const headerTitle = 'Done Recipes';

function DoneRecipes() {
  const { doneRecipes } = useContext(RecipesAppContext);
  const [filter, setFilter] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    setFilteredRecipes(
      doneRecipes
        .filter(({ type }) => type.includes(filter)),
    );
  }, [doneRecipes]);

  const handleFilterClick = (clicked) => {
    const newFilter = clicked === filter ? '' : clicked;
    setFilter(newFilter);
  };

  return (
    <div>
      <Header title={ headerTitle } />
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
        {filteredRecipes.map(({ image, type, name, doneDate, id, tags }, index) => (
          <div key={ id }>
            <img
              src={ image }
              alt={ `${name} icon` }
              data-testid={ `${index}-horizontal-image` }
            />
            <span data-testid={ `${index}-horizontal-top-text` }>{type}</span>
            <span data-testid={ `${index}-horizontal-name` }>{name}</span>
            <span data-testid={ `${index}-horizontal-done-date` }>{doneDate}</span>
            <ShareButton
              link={ `${window.location.origin}/${type}s/${id}` }
              data-testid={ `${index}-horizontal-share-btn` }
            />
            <div>
              {tags.map((tag) => (
                <span
                  key={ `${id}-${tag}` }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
