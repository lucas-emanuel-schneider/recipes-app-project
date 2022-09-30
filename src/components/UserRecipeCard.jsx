import { instanceOf } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

function UserRecipeCard({ recipe, index, inFavoritesPage }) {
  const {
    image,
    type,
    alcoholicOrNot, nationality, category,
    name,
    doneDate,
    id,
    tags,
  } = recipe;

  return (
    <div>
      <ShareButton
        link={ `${window.location.origin}/${type}s/${id}` }
        testId={ `${index}-horizontal-share-btn` }
      />
      {inFavoritesPage && (
        <FavoriteButton
          testId={ `${index}-horizontal-favorite-btn` }
          recipeInfo={ recipe }
        />
      )}
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
      {!inFavoritesPage && (
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
  );
}

UserRecipeCard.propTypes = {
  recipe: instanceOf(Object),
}.isRequired;

export default UserRecipeCard;
