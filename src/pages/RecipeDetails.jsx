import React, { useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DrinksDetails from '../components/DrinksDetails';
import MealsDetails from '../components/MealsDetails';
import drinksAPI from '../services/drinksAPI';
import mealsAPI from '../services/mealsAPI';
import RecipesAppContext from '../context/RecipesAppContext';
import Recommendations from '../components/Recommendations';
import DetailsHeader from '../components/DetailsHeader';

function RecipeDetails() {
  const { setRecipeDetails } = useContext(RecipesAppContext);
  const { id } = useParams();
  const location = useLocation();
  const isMeal = location.pathname.includes('meals');

  useEffect(() => {
    const getDetails = async () => {
      const { fetchById } = isMeal ? mealsAPI : drinksAPI;
      const data = await fetchById(id);
      setRecipeDetails(data);
    };
    getDetails();
  }, [id, location.pathname, isMeal, setRecipeDetails]);

  return (
    <div>
      <DetailsHeader isMeal={ isMeal } />
      {
        isMeal ? <MealsDetails />
          : <DrinksDetails />
      }
      <Recommendations isMeal={ isMeal } />
    </div>
  );
}

export default RecipeDetails;
