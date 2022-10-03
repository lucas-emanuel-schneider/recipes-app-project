import { string } from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';

function RecipeCard({ index, name, thumb, id }) {
  const { category } = useContext(RecipesAppContext);
  return (
    <Link
      className="text-decoration-none"
      to={ `/${category}/${id}` }
    >
      <div
        style={ { width: '160px' } }
        className="card mb-3"
        data-testid={ `${index}-recipe-card` }
      >
        <img
          className="card-img-top"
          data-testid={ `${index}-card-img` }
          src={ thumb }
          alt={ name }
        />
        <div
          className="card-body"
        >
          <h5
            className="fw-bold text-dark"
            data-testid={ `${index}-card-name` }
          >
            {name}
          </h5>
        </div>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  index: string,
  name: string,
  thumb: string,
}.isRequired;

export default RecipeCard;
