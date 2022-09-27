import React, { useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DrinksDetails from '../components/DrinksDetails';
import MealsDetails from '../components/MealsDetails';
import drinksAPI from '../services/drinksAPI';
import mealsAPI from '../services/mealsAPI';
import RecipesAppContext from '../context/RecipesAppContext';

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
      {
        isMeal ? <MealsDetails />
          : <DrinksDetails />
      }
    </div>
  );
}

export default RecipeDetails;
