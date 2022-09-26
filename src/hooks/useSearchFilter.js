import { useContext, useEffect, useState } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';

const MAX_RECIPES = 12;

function useSearchFilter({ fetchByIngredient, fetchByName, fetchByFirstLetter }) {
  const { search } = useContext(RecipesAppContext);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const getFilteredRecipeList = async () => {
      let data;
      const { type, value } = search;
      switch (type) {
      case 'ingredient':
        data = await fetchByIngredient(value);
        break;
      case 'name':
        data = await fetchByName(value);
        break;
      case 'first-letter':
        data = await fetchByFirstLetter(value);
        break;
      default:
        setFilteredList([]);
      }

      setFilteredList(data);
    };
    getFilteredRecipeList();
  }, [search]);

  return filteredList && filteredList.filter((recipe, index) => index < MAX_RECIPES);
}

export default useSearchFilter;
