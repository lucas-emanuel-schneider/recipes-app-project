import { string } from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';

function RecipeCard({ index, name, src, id }) {
  const { category } = useContext(RecipesAppContext);
  return (
    <Link to={ `/${category}/${id}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img data-testid={ `${index}-card-img` } src={ src } alt="" />
        <span data-testid={ `${index}-card-name` }>{name}</span>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  index: string,
  name: string,
  src: string,
}.isRequired;

export default RecipeCard;
