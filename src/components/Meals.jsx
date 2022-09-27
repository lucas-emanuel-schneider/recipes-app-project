import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import CategoryFilter from './CategoryFilter';
import Header from './Header';
import RecipeCard from './RecipeCard';

const headerTitle = 'Meals';

function Meals() {
  const { filter, recipes, setCategory } = useContext(RecipesAppContext);
  const history = useHistory();

  useEffect(() => {
    setCategory('meals');
  }, []);

  useEffect(() => {
    if (!filter && recipes && recipes.length === 1) {
      history.push(`meals/${recipes[0].idMeal}`);
    }
  }, [recipes]);

  return (
    <div>
      <Header title={ headerTitle } showSearchBtn />
      <CategoryFilter />
      {recipes
        && recipes.map(({ strMeal, strMealThumb, idMeal }, index) => (
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
