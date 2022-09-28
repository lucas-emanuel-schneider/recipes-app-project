import React, { useContext, useEffect, useState } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';

function MealsDetails() {
  const { recipeDetails } = useContext(RecipesAppContext);
  const [storage, setStorage] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const {
    idMeal,
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = recipeDetails;

  useEffect(() => {
    const doneRecipesStorage = localStorage.getItem('doneRecipes');
    if (doneRecipesStorage && idMeal) {
      const resultStorage = JSON.parse(doneRecipesStorage);
      const resultBool = resultStorage.includes(idMeal);
      setStorage(resultBool);
    }
    const inProgressStorage = localStorage.getItem('inProgressRecipes');
    if (inProgressStorage && idMeal) {
      const result = JSON.parse(inProgressStorage);
      const resultProgressBool = result.includes(idMeal);
      setInProgress(resultProgressBool);
    }
  }, [idMeal]);

  const entries = Object.entries(recipeDetails);
  const details = entries
    .filter((entrie) => entrie[1] !== null && entrie[1] !== '');
  const ingredients = details.filter((ing) => ing[0].includes('strIngredient'));
  const measures = details.filter((mea) => mea[0].includes('strMeasure'));
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
            { !inProgress ? 'Start Recipe' : 'Continue Recipe' }
          </button>
        )}
        <img data-testid="recipe-photo" src={ strMealThumb } alt={ strMeal } />
        <h1 data-testid="recipe-title">{ strMeal }</h1>
        <h3 data-testid="recipe-category">{ strCategory }</h3>
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
        <iframe
          width="560"
          height="315"
          data-testid="video"
          src={ strYoutube && strYoutube.replace('watch?v=', 'embed/') }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer;
          autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>)
  );
}

export default MealsDetails;
