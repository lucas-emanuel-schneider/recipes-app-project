const PROGRESS_KEY = 'inProgressRecipes';

if (!JSON.parse(localStorage.getItem(PROGRESS_KEY))) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify({ drinks: {}, meals: {} }));
}
export const loadProgressRecipes = () => JSON.parse(localStorage.getItem(PROGRESS_KEY));

export const saveProgressRecipes = (progressRecipes) => localStorage
  .setItem(PROGRESS_KEY, JSON.stringify(progressRecipes));
