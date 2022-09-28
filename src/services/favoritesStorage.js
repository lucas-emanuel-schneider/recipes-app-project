const FAVORITES_KEY = 'favoriteRecipes';

if (!JSON.parse(localStorage.getItem(FAVORITES_KEY))) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([]));
}
export const loadFavorites = () => JSON.parse(localStorage.getItem(FAVORITES_KEY));

export const saveFavorites = (favorites) => localStorage
  .setItem(FAVORITES_KEY, JSON.stringify(favorites));
