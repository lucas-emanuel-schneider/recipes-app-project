import { instanceOf } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

function RecipesList({ recipes }) {
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
        {filteredRecipes.map(({
          image,
          type,
          alcoholicOrNot, nationality, category,
          name,
          doneDate,
          id,
          tags,
        }, index) => (
          <div key={ id }>
            <ShareButton
              link={ `${window.location.origin}/${type}s/${id}` }
              testId={ `${index}-horizontal-share-btn` }
            />
            {inFavoritesPage
            && <FavoriteButton
              testId={ `${index}-horizontal-favorite-btn` }
              recipeInfo={ filteredRecipes[index] }
            />}
            <Link to={ `/${type}s/${id}` }>
              <img
                src={ image }
                alt={ `${name} icon` }
                className="card-image"
                data-testid={ `${index}-horizontal-image` }
              />
              <span data-testid={ `${index}-horizontal-name` }>{name}</span>
            </Link>
            <span data-testid={ `${index}-horizontal-top-text` }>
              {`${nationality || alcoholicOrNot} - ${category}`}
            </span>
            <span data-testid={ `${index}-horizontal-done-date` }>{doneDate}</span>
            {!inFavoritesPage
              && (
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
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

RecipesList.propTypes = {
  recipes: instanceOf(Array),
}.isRequired;

export default RecipesList;
