import React, { useContext, useState, useEffect } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';

function DrinksDetails() {
  const { recipeDetails } = useContext(RecipesAppContext);
  const [storage, setStorage] = useState(false);
  const {
    strDrinkThumb,
    strDrink,
    strAlcoholic,
    strInstructions,
    idDrink } = recipeDetails;
  const entries = Object.entries(recipeDetails);
  const details = entries
    .filter((entrie) => entrie[1] !== null);
  const ingredients = details.filter((ing) => ing[0].includes('strIngredient'));
  const measures = details.filter((mea) => mea[0].includes('strMeasure'));

  useEffect(() => {
    const doneRecipesStorage = localStorage.getItem('doneRecipes');
    if (doneRecipesStorage) {
      const resultStorage = JSON.parse(doneRecipesStorage);
      setStorage(resultStorage);
      if (idDrink && storage.includes(idDrink)) setStorage(true);
    }
  }, [idDrink]);

  return (
    recipeDetails
    && (
      <div>
        { !storage
        && (
          <button
            type="button"
            className="start-recipe-btn"
            data-testid="start-recipe-btn"
          >
            Start Recipe
          </button>
        )}

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
