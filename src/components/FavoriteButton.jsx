import React, { useState, useEffect, useContext } from 'react';
import { instanceOf, string } from 'prop-types';
import notFavIcon from '../images/whiteHeartIcon.svg';
import favIcon from '../images/blackHeartIcon.svg';
import RecipesAppContext from '../context/RecipesAppContext';

function FavoriteButton({ recipeInfo, testId }) {
  const { favorites, toggleFavorite } = useContext(RecipesAppContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favorites) {
      const { id } = recipeInfo;
      setIsFavorite(favorites.some((favorite) => id === favorite.id));
    }
  }, [favorites, recipeInfo]);

  const handleFavoriteClick = () => {
    const recipe = { ...recipeInfo };
    if (recipe.tags) delete recipe.tags;
    toggleFavorite(recipe);
  };

  return (
    <img
      role="presentation"
      data-testid={ testId || 'favorite-btn' }
      src={ isFavorite ? favIcon : notFavIcon }
      alt="Favorite button icon"
      onClick={ handleFavoriteClick }
    />
  );
}

FavoriteButton.defaultProps = {
  testId: '',
};

FavoriteButton.propTypes = {
  recipeInfo: instanceOf(Object),
  testId: string,
}.isRequired;

export default FavoriteButton;
