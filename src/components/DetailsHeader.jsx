import { bool } from 'prop-types';
import React, { useContext } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

function DetailsHeader({ isMeal }) {
  const { recipeDetails } = useContext(RecipesAppContext);

  const {
    idMeal, idDrink,
    strArea,
    strCategory,
    strAlcoholic,
    strMeal, strDrink,
    strMealThumb, strDrinkThumb,
  } = recipeDetails;

  const recipeInfo = {
    id: idMeal || idDrink,
    type: isMeal ? 'meal' : 'drink',
    nationality: strArea || '',
    category: strCategory || '',
    alcoholicOrNot: strAlcoholic || '',
    name: strMeal || strDrink,
    image: strMealThumb || strDrinkThumb,
  };

  return (
    <header
      className="position-absolute top-0 end-0"
    >
      <div
        className="d-flex flex-row m-3"
      >
        <ShareButton />
        <div
          className="ms-3"
        >
          <FavoriteButton recipeInfo={ recipeInfo } />
        </div>
      </div>
    </header>
  );
}

DetailsHeader.propTypes = {
  isMeal: bool,
}.isRequired;

export default DetailsHeader;
