import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import { saveDoneRecipes } from '../services/doneRecipesStorage';
import doneRecipesMock from './helpers/doneRecipesMock';
import { saveFavorites } from '../services/favoritesStorage';
import favoritesMock from './helpers/favoritesMock';

describe('Testa o componente UserRecipes', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });

  it('Deve listar receitas finalizadas na rota done-recipes', async () => {
    saveDoneRecipes(doneRecipesMock);

    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });

    expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(3);
  });
  it('Deve listar receitas favoritadas na rota favorites', async () => {
    saveFavorites(favoritesMock);

    renderWithRouter(<App />, { initialEntries: ['/favorite-recipes'] });

    expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(4);
  });
  it('Deve ser possivel filtrar elementos por tipo', async () => {
    saveDoneRecipes(doneRecipesMock);

    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });

    expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(3);

    userEvent.click(screen.getByTestId(/filter-by-meal-btn/i));
    expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(1);

    userEvent.click(screen.getByTestId(/filter-by-all-btn/i));
    expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(3);

    userEvent.click(screen.getByTestId(/filter-by-drink-btn/i));
    expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(2);

    userEvent.click(screen.getByTestId(/filter-by-drink-btn/i));
    expect(screen.getAllByTestId(/horizontal-name/i).length).toBe(3);
  });
});
