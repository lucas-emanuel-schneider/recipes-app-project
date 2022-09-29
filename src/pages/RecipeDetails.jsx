import React, { useEffect, useContext, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import DrinksDetails from '../components/DrinksDetails';
import MealsDetails from '../components/MealsDetails';
import drinksAPI from '../services/drinksAPI';
import mealsAPI from '../services/mealsAPI';
import RecipesAppContext from '../context/RecipesAppContext';
import Recommendations from '../components/Recommendations';
import DetailsHeader from '../components/DetailsHeader';

function RecipeDetails() {
  const {
    setRecipeDetails,
    doneRecipes,
    inProgressRecipes,
  } = useContext(RecipesAppContext);

  const { id } = useParams();
  const { pathname } = useLocation();
  const isMeal = pathname.includes('meals');
  const [isDone, setIsDone] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      const { fetchById } = isMeal ? mealsAPI : drinksAPI;
      const data = await fetchById(id);
      setRecipeDetails(data);
    };
    getDetails();
  }, [id, pathname, isMeal, setRecipeDetails]);

  useEffect(() => {
    setIsDone(doneRecipes.some((recipe) => recipe.id === id));
  }, [doneRecipes]);

  useEffect(() => {
    const { meals, drinks } = inProgressRecipes;
    const current = isMeal ? meals : drinks;
    if (current[id]) setInProgress(true);
    else setInProgress(false);
  }, [inProgressRecipes]);

  return (
    <div>
      <DetailsHeader isMeal={ isMeal } />
      {
        isMeal ? <MealsDetails />
          : <DrinksDetails />
      }
      <Recommendations isMeal={ isMeal } />
      { !isDone
        && (
          <Link to={ `${pathname}/in-progress` }>
            <button
              type="button"
              className="start-recipe-btn"
              data-testid="start-recipe-btn"
            >
              { inProgress ? 'Continue Recipe' : 'Start Recipe' }
            </button>
          </Link>
        )}
    </div>
  );
}

export default RecipeDetails;
