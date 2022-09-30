import { string } from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';

function RecipeCard({ index, name, thumb, id }) {
  const { category } = useContext(RecipesAppContext);
  return (
    <Link to={ `/${category}/${id}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img data-testid={ `${index}-card-img` } src={ thumb } alt="" />
        <span data-testid={ `${index}-card-name` }>{name}</span>
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
