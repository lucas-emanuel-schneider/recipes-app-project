import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useSearchFilter from '../hooks/useSearchFilter';
import {
  fetchDrinksByFirstLetter,
  fetchDrinksByIngredient,
  fetchDrinksByName,
} from '../services/cocktailsAPI';
import Header from './Header';
import RecipeCard from './RecipeCard';
import RecipesAppContext from '../context/RecipesAppContext';

const headerTitle = 'Drinks';

function Drinks() {
  const { setCategory } = useContext(RecipesAppContext);
  const history = useHistory();
  const filtered = useSearchFilter({
    fetchByIngredient: fetchDrinksByIngredient,
    fetchByName: fetchDrinksByName,
    fetchByFirstLetter: fetchDrinksByFirstLetter,
  });

  useEffect(() => setCategory('drinks'), []);

  useEffect(() => {
    if (!filtered) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }
    if (filtered.length === 1) {
      history.push(`drinks/${filtered[0].idDrink}`);
    }
  }, [filtered]);

  return (
    <div>
      <Header title={ headerTitle } showSearchBtn />
      {filtered
        && filtered.map(({ strDrink, strDrinkThumb, idDrink }, index) => (
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
