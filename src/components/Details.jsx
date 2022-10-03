import React, { useContext } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';

function Details() {
  const { recipeDetails } = useContext(RecipesAppContext);

  const {
    strMealThumb, strDrinkThumb,
    strMeal, strDrink,
    strAlcoholic,
    strCategory,
    strInstructions,
    strYoutube,
  } = recipeDetails;
  const entries = Object.entries(recipeDetails)
    .filter((entrie) => entrie[1] !== null && entrie[1] !== '');
  const ingredients = entries.filter((ing) => ing[0].includes('strIngredient'));
  const measures = entries.filter((mea) => mea[0].includes('strMeasure'));
  return (
    recipeDetails
    && (
      <div>
        <img
          className="img-fluid"
          data-testid="recipe-photo"
          src={ strMealThumb || strDrinkThumb }
          alt={ strMeal || strDrink }
        />
        <div
          className="m-3"
        >
          <h1 data-testid="recipe-title">{ strMeal || strDrink }</h1>
          <h3 data-testid="recipe-category">{ strAlcoholic || strCategory }</h3>
          <ul>
            {
              ingredients.map((item, index) => (
                <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
                  {`${item[1]} ${(measures[index]) ? measures[index][1] : ''}`}
                </li>
              ))
            }
          </ul>
          <p
            data-testid="instructions"
            className="text-break"
          >
            { strInstructions }
          </p>
        </div>
        {
          strYoutube
        && (
          <div
            className="m-3 d-flex"
          >
            <iframe
              className="flex-grow-1"
              // width="360"
              height="315"
              data-testid="video"
              src={ strYoutube.replace('watch?v=', 'embed/') }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer;
        autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )
        }

      </div>)
  );
}

export default Details;
