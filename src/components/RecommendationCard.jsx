import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

function RecommendationCard({ index, name, src, id, category }) {
  return (
    <Link to={ `/${category}/${id}` }>
      <div
        data-testid={ `${index}-recommendation-card` }
        className="scroll-item"
      >
        <img src={ src } alt="" />
        <span data-testid={ `${index}-recommendation-title` }>{name}</span>
      </div>
    </Link>
  );
}

RecommendationCard.propTypes = {
  index: string,
  name: string,
  src: string,
}.isRequired;

export default RecommendationCard;
