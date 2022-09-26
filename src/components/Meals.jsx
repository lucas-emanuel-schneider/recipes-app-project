import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useSearchFilter from '../hooks/useSearchFilter';
import {
  fetchMealsByFirstLetter,
  fetchMealsByIngredient,
  fetchMealsByName,
} from '../services/mealsAPI';
import Header from './Header';
import RecipeCard from './RecipeCard';
import RecipesAppContext from '../context/RecipesAppContext';

const headerTitle = 'Meals';

function Meals() {
  const { setCategory } = useContext(RecipesAppContext);
  const history = useHistory();
  const filtered = useSearchFilter({
    fetchByIngredient: fetchMealsByIngredient,
    fetchByName: fetchMealsByName,
    fetchByFirstLetter: fetchMealsByFirstLetter,
  });

  useEffect(() => setCategory('meals'), []);

  useEffect(() => {
    if (!filtered) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    if (filtered.length === 1) {
      history.push(`meals/${filtered[0].idMeal}`);
    }
  }, [filtered]);

  return (
    <div>
      <Header title={ headerTitle } showSearchBtn />
      {filtered
        && filtered.map(({ strMeal, strMealThumb, idMeal }, index) => (
          <RecipeCard
            key={ index }
            index={ index }
            name={ strMeal }
            src={ strMealThumb }
            id={ idMeal }
          />
        ))}
    </div>
  );
}

export default Meals;
