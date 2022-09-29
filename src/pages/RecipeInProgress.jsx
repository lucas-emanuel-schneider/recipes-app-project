import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import drinksAPI from '../services/drinksAPI';
import mealsAPI from '../services/mealsAPI';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

function RecipeInProgress() {
  const { recipeDetails, setRecipeDetails } = useContext(RecipesAppContext);
  const { strMealThumb,
    strMeal,
    strCategory,
    strDrinkThumb,
    strDrink,
    strAlcoholic,
    strInstructions,
    strTags,
    strArea,
  } = recipeDetails;

  const { pathname } = useLocation();
  const { id } = useParams();
  const isMeal = pathname.includes('meals');

  const recipeInfo = {
    id,
    type: isMeal ? 'meal' : 'drink',
    nationality: strArea || '',
    category: strCategory || '',
    alcoholicOrNot: strAlcoholic || '',
    name: strMeal || strDrink,
    image: strMealThumb || strDrinkThumb,
    tags: strTags || [],
  };

  useEffect(() => {
    const getDetails = async () => {
      const { fetchById } = isMeal ? mealsAPI : drinksAPI;
      const data = await fetchById(id);
      setRecipeDetails(data);
    };
    getDetails();
  }, [id, pathname, isMeal, setRecipeDetails]);

  return (
    <div>
      <img data-testid="recipe-photo" src={ recipeInfo.image } alt={ recipeInfo.name } />
      <h1 data-testid="recipe-title">{ recipeInfo.name }</h1>
      <ShareButton />
      <FavoriteButton recipeInfo={ recipeInfo } />
    </div>
  );
}

export default RecipeInProgress;
