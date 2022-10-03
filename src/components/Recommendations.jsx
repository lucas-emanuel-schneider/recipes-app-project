import { bool } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';
import drinksAPI from '../services/drinksAPI';
import mealsAPI from '../services/mealsAPI';
import RecommendationCard from './RecommendationCard';

const MAX_RECOMMENDATIONS = 6;

function Recommendations({ isMeal }) {
  const { getFirstBatch } = useContext(RecipesAppContext);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const getRecommendations = async () => {
      const { fetchByName } = isMeal ? drinksAPI : mealsAPI;
      const data = await fetchByName('');
      setRecommendations(getFirstBatch(data, MAX_RECOMMENDATIONS));
    };
    getRecommendations();
  }, [isMeal, getFirstBatch]);

  return (
    <div className="horizontal-scroll d-flex flex-row m-3">
      {
        recommendations
        && recommendations
          .map(({ strMeal, strMealThumb, idMeal, strDrink, strDrinkThumb, idDrink,
          }, index) => (
            <RecommendationCard
              key={ index }
              index={ index }
              name={ strMeal || strDrink }
              src={ strMealThumb || strDrinkThumb }
              id={ idMeal || idDrink }
              category={ isMeal ? 'drinks' : 'meals' }
            />
          ))
      }
    </div>
  );
}

Recommendations.propTypes = {
  isMeal: bool,
}.isRequired;

export default Recommendations;
