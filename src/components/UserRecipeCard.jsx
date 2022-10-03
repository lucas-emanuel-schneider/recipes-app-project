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
    <div
      className="card d-flex flex-row"
    >
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt={ `${name} icon` }
          className="card-img rounded-start"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div>
        <Link to={ `/${type}s/${id}` }>
          <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
        </Link>
        <h4 data-testid={ `${index}-horizontal-top-text` }>
          {`${nationality || alcoholicOrNot} - ${category}`}
        </h4>
        <p
          className="text-muted"
          data-testid={ `${index}-horizontal-done-date` }
        >
          {doneDate}
        </p>
        {!inFavoritesPage && (
          <div>
            {tags.map((tag) => (
              <span
                className="border border-primary"
                key={ `${id}-${tag}` }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))}
          </div>
        )}
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
      </div>
    </div>
  );
}

UserRecipeCard.propTypes = {
  recipe: instanceOf(Object),
}.isRequired;

export default UserRecipeCard;
