import React, { useState, useEffect, useContext } from 'react';
import { instanceOf } from 'prop-types';
import notFavIcon from '../images/whiteHeartIcon.svg';
import favIcon from '../images/blackHeartIcon.svg';
import RecipesAppContext from '../context/RecipesAppContext';

function FavoriteButton({ recipeInfo }) {
  const { favorites, toggleFavorite } = useContext(RecipesAppContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favorites) {
      const { id } = recipeInfo;
      setIsFavorite(favorites.some((favorite) => id === favorite.id));
    }
  }, [favorites, recipeInfo]);

  const handleFavoriteClick = () => {
    console.log('oi');
    toggleFavorite(recipeInfo);
  };

  return (
    <img
      role="presentation"
      data-testid="favorite-btn"
      src={ isFavorite ? favIcon : notFavIcon }
      alt="Favorite button icon"
      onClick={ handleFavoriteClick }
    />
  );
}

FavoriteButton.propTypes = {
  recipeInfo: instanceOf(Object),
}.isRequired;

export default FavoriteButton;
