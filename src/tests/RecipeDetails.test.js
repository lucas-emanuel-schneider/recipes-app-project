import React from 'react';
import { waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

describe('Testa a página RecipeDetail', () => {
  it('Deve fazer fetch corretamente ao detalhar meal', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    const id = 52771;

    renderWithRouter(<App />, { initialEntries: [`/meals/${id}`] });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toBeCalledWith(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    });
  });
  it('Deve fazer fetch corretamente ao detalhar drink', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });

    const id = 178319;

    renderWithRouter(<App />, { initialEntries: [`/drinks/${id}`] });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toBeCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    });
  });
});
