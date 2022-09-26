import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import Header from './Header';
import RecipeCard from './RecipeCard';

const headerTitle = 'Drinks';

function Drinks() {
  const { recipes, setCategory } = useContext(RecipesAppContext);
  const history = useHistory();

  useEffect(() => {
    setCategory('drinks');
  }, []);

  useEffect(() => {
    if (recipes && recipes.length === 1) {
      history.push(`drinks/${recipes[0].idDrink}`);
    }
  }, [recipes]);

  return (
    <div>
      <Header title={ headerTitle } showSearchBtn />
      {recipes
        && recipes.map(({ strDrink, strDrinkThumb, idDrink }, index) => (
          <RecipeCard
            key={ index }
            index={ index }
            name={ strDrink }
            src={ strDrinkThumb }
            id={ idDrink }
          />
        ))}
    </div>
  );
}

export default Drinks;
