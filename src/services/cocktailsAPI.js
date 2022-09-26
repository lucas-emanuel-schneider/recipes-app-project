export const fetchDrinksByIngredient = async (ingredient) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const { drinks } = await response.json();
  return drinks;
};

export const fetchDrinksByName = async (name) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const { drinks } = await response.json();
  return drinks;
};

export const fetchDrinksByFirstLetter = async (firstLetter) => {
  if (firstLetter.length > 1) {
    global.alert('Your search must have only 1 (one) character');
    return;
  }
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
  const { drinks } = await response.json();
  return drinks;
};
