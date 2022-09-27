const drinksAPI = {
  fetchCategories: async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const { drinks } = await response.json();
    return drinks.map(({ strCategory }) => strCategory);
  },
  fetchByCategory: async (category) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const { drinks } = await response.json();
    return drinks;
  },
  fetchByIngredient: async (ingredient) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const { drinks } = await response.json();
    return drinks;
  },
  fetchByName: async (name) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const { drinks } = await response.json();
    return drinks;
  },
  fetchByFirstLetter: async (firstLetter) => {
    if (firstLetter.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const { drinks } = await response.json();
    return drinks;
  },
};

export default drinksAPI;
