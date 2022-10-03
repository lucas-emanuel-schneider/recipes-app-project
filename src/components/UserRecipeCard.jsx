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
      style={ { width: '160px' } }
      className="card mb-3"
    >
      <Link
        className="text-decoration-none"
        to={ `/${type}s/${id}` }
      >
        <img
          src={ image }
          alt={ `${name} icon` }
          className="card-img"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div
        className="card-body"
      >
        <Link
          className="text-decoration-none"
          to={ `/${type}s/${id}` }
        >
          <h3
            className="fw-bold text-dark"
            data-testid={ `${index}-horizontal-name` }
          >
            {name}
          </h3>
        </Link>
        <h5
          className="card-text"
          data-testid={ `${index}-horizontal-top-text` }
        >
          {`${nationality || alcoholicOrNot} - ${category}`}
        </h5>
        <p
          className="text-muted"
          data-testid={ `${index}-horizontal-done-date` }
        >
          {doneDate}
        </p>
        {!inFavoritesPage && (
          <div
            className="d-flex flex-row flex-wrap"
          >
            {tags.map((tag) => (
              <span
                className="border border-primary rounded mb-2"
                key={ `${id}-${tag}` }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div
          className="d-flex flex-row"
        >
          <ShareButton
            link={ `${window.location.origin}/${type}s/${id}` }
            testId={ `${index}-horizontal-share-btn` }
          />
          {inFavoritesPage && (
            <div
              className="ms-2"
            >
              <FavoriteButton
                testId={ `${index}-horizontal-favorite-btn` }
                recipeInfo={ recipe }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

UserRecipeCard.propTypes = {
  recipe: instanceOf(Object),
}.isRequired;

export default UserRecipeCard;
