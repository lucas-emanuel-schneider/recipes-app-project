import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SubCategoryFilter from '../components/SubCategoryFilter';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';
import RecipesAppContext from '../context/RecipesAppContext';

function Recipes() {
  const { recipes, filter, category, setCategory } = useContext(RecipesAppContext);
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    setCategory(pathname.includes('meals') ? 'meals' : 'drinks');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!filter && recipes && recipes.length === 1) {
      history.push(`${category}/${recipes[0].idMeal || recipes[0].idDrink}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes, filter, category]);

  return (
    <div>
      <Header title={ category === 'meals' ? 'Meals' : 'Drinks' } showSearchBtn />
      <SubCategoryFilter />
      <div
        className="d-flex flex-row flex-wrap m-3 justify-content-between"
      >
        {
          recipes
        && recipes.map(({
          strMeal, strDrink,
          strMealThumb, strDrinkThumb,
          idMeal, idDrink,
        }, index) => (
          <RecipeCard
            key={ index }
            index={ index }
            name={ strMeal || strDrink }
            thumb={ strMealThumb || strDrinkThumb }
            id={ idMeal || idDrink }
          />
        ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
