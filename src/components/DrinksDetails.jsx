import React, { useContext } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';

function DrinksDetails() {
  const { recipeDetails } = useContext(RecipesAppContext);
  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = recipeDetails;
  const entries = Object.entries(recipeDetails);
  const details = entries
    .filter((entrie) => entrie[1] !== null);
  const ingredients = details.filter((ing) => ing[0].includes('strIngredient'));
  const measures = details.filter((mea) => mea[0].includes('strMeasure'));
  return (
    recipeDetails
    && (
      <div>
        <button type="button" className="start-recipe-btn" data-testid="start-recipe-btn">
          Start Recipe
        </button>
        <img data-testid="recipe-photo" src={ strDrinkThumb } alt={ strDrink } />
        <h1 data-testid="recipe-title">{ strDrink }</h1>
        <h3 data-testid="recipe-category">{ strAlcoholic }</h3>
        <p data-testid="instructions">{ strInstructions }</p>
        <ul>
          {
            ingredients.map((item, index) => (
              <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
                {`${item[1]} ${(measures[index]) ? measures[index][1] : ''}`}
              </li>
            ))
          }
        </ul>
      </div>)
  );
}

export default DrinksDetails;
