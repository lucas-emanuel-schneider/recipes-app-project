import { string } from 'prop-types';
import React from 'react';

function RecipeCard({ index, name, src }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ src } alt="" />
      <span data-testid={ `${index}-card-name` }>{name}</span>
    </div>
  );
}

RecipeCard.propTypes = {
  index: string,
  name: string,
  src: string,
}.isRequired;

export default RecipeCard;
