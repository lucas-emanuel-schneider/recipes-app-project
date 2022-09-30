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
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const { drinks } = await response.json();
    return drinks;
  },
  fetchById: async (id) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { drinks } = await response.json();
    return drinks[0];
  },
};

export default drinksAPI;
