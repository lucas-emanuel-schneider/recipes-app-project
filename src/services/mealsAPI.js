const mealsAPI = {
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
    if (firstLetter.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
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
