import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

function RecommendationCard({ index, name, src, id, category }) {
  return (
    <Link
      className="text-decoration-none"
      to={ `/${category}/${id}` }
    >
      <div
        style={ { width: '160px' } }
        className="card me-2"
        data-testid={ `${index}-recommendation-card` }
      >
        <img
          className="card-img-top"
          src={ src }
          alt={ name }
        />
        <div
          className="card-body"
        >
          <h5
            className="fw-bold text-dark"
            data-testid={ `${index}-recommendation-title` }
          >
            {name}
          </h5>
        </div>
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
