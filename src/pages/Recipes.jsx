import React from 'react';
import { useHistory } from 'react-router-dom';
import Drinks from '../components/Drinks';
import Meals from '../components/Meals';

function Recipes() {
  const history = useHistory();
  const currentPage = history.location.pathname;
  return (
    <div>
      {currentPage === '/meals' ? <Meals /> : <Drinks />}
    </div>
  );
}

export default Recipes;
