import React, { useEffect, useContext, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import DetailsHeader from '../components/DetailsHeader';
import Details from '../components/Details';
import Recommendations from '../components/Recommendations';
import drinksAPI from '../services/drinksAPI';
import mealsAPI from '../services/mealsAPI';
import RecipesAppContext from '../context/RecipesAppContext';

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
  }, [doneRecipes, id]);

  useEffect(() => {
    const { meals, drinks } = inProgressRecipes;
    const current = isMeal ? meals : drinks;
    if (current[id]) setInProgress(true);
    else setInProgress(false);
  }, [inProgressRecipes, isMeal, id]);

  return (
    <div>
      <DetailsHeader isMeal={ isMeal } />
      <Details />
      <Recommendations isMeal={ isMeal } />
      { !isDone
        && (
          <Link to={ `${pathname}/in-progress` }>
            <div
              className="start-recipe-btn-container m-3 d-grid"
            >
              <button
                className="btn btn-primary"
                type="button"
                data-testid="start-recipe-btn"
              >
                { inProgress ? 'Continue Recipe' : 'Start Recipe' }
              </button>
            </div>
          </Link>
        )}
    </div>
  );
}

export default RecipeDetails;
