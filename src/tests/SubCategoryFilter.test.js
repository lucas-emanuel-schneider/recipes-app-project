import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import beefMeals from '../../cypress/mocks/beefMeals';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import { meals } from '../../cypress/mocks/meals';
import { drinks } from '../../cypress/mocks/drinks';

describe('Testa o componente SubCategoryFilter', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });

  it('Deve ser possivel filtrar meals por categoria', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    });

    expect(screen.getAllByTestId(/category-filter/i).length).toBe(6);

    userEvent.click(screen.getAllByTestId(/category-filter/i)[1]);

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
    });

    const filteredMeals = beefMeals.meals.slice(0, 12);
    filteredMeals.forEach((meal, index) => {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
    });

    userEvent.click(screen.getAllByTestId(/category-filter/i)[0]);

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    });

    const initialMeals = meals.slice(0, 12);
    initialMeals.forEach((meal, index) => {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
    });
  });
  it('Deve ser possivel filtrar drinks por categoria', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    });

    expect(screen.getAllByTestId(/category-filter/i).length).toBe(6);

    userEvent.click(screen.getAllByTestId(/category-filter/i)[1]);

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink');
    });

    const filteredDrinks = ordinaryDrinks.drinks.slice(0, 12);
    filteredDrinks.forEach((drink, index) => {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
    });

    userEvent.click(screen.getAllByTestId(/category-filter/i)[0]);

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    });

    const initialDrinks = drinks.slice(0, 12);
    initialDrinks.forEach((drink, index) => {
      expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
    });
  });
});
