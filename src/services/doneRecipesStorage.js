const DONE_KEY = 'doneRecipes';

if (!JSON.parse(localStorage.getItem(DONE_KEY))) {
  localStorage.setItem(DONE_KEY, JSON.stringify([]));
}
export const loadDoneRecipes = () => JSON.parse(localStorage.getItem(DONE_KEY));

export const saveDoneRecipes = (doneRecipes) => localStorage
  .setItem(DONE_KEY, JSON.stringify(doneRecipes));
