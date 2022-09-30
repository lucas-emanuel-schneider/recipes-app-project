const mealsAPI = {
  fetchCategories: async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const { meals } = await response.json();
    return meals.map(({ strCategory }) => strCategory);
  },
  fetchByCategory: async (category) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const { meals } = await response.json();
    return meals;
  },
  fetchByIngredient: async (ingredient) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const { meals } = await response.json();
    return meals;
  },
  fetchByName: async (name) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const { meals } = await response.json();
    return meals;
  },
  fetchByFirstLetter: async (firstLetter) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    const { meals } = await response.json();
    return meals;
  },
  fetchById: async (id) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const { meals } = await response.json();
    return meals[0];
  },
};

export default mealsAPI;
