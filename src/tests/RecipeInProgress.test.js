import React from 'react';
import { screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import oneDrinkId15997 from '../../cypress/mocks/oneDrinkId15997';
import oneMeal from '../../cypress/mocks/oneMeal';

const ID_MEAL = 52771;
const ID_TEST = 15997;

describe('Testa a página Recipe inProgress', () => {
  beforeEach(() => {
    cleanup();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrinkId15997),
    });
    // Organiza sempre o fetch com Mock do ID_TEST de um drink
  });
  it('Deve fazer fetch corretamente ao começar a pagina', async () => {
    // Renderiza na tela
    renderWithRouter(<App />, { initialEntries: [`/drinks/${ID_TEST}/in-progress`] });
    // Espera o Fetch ser chamado com o endpoint correto
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toBeCalledWith(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ID_TEST}`);
    });
  });
  it('Deve conter os elementos na tela', async () => {
    // Renderiza na tela e espera o fetch acontecer
    renderWithRouter(<App />, { initialEntries: [`/drinks/${ID_TEST}/in-progress`] });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    // Captura os elementos na tela
    const drinkImage = screen.getByRole('img', { name: /gg/i });
    const drinkTittle = screen.getByRole('heading', { name: /gg/i });
    const shareButton = screen.getByTestId('share-btn');
    const favoriteButton = screen.getByTestId('favorite-btn');
    const drinkCategory = screen.getByRole('heading', { name: /ordinary drink/i });
    const labelIngredients = screen.getAllByTestId(/-ingredient-step/i);
    const instructions = screen.getByText(/pour the galliano/i);
    const finishButton = screen.getByRole('button', { name: /finish recipe/i });
    // Verifica se estão na tela
    expect(drinkImage).toBeInTheDocument();
    expect(drinkTittle).toBeInTheDocument();
    expect(shareButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(drinkCategory).toBeInTheDocument();
    expect(labelIngredients).toHaveLength(3);
    expect(instructions).toBeInTheDocument();
    expect(finishButton).toBeInTheDocument();
    // Verifica se é possivel marcar os elementos como checked
    const firstIngredient = screen.getByRole('checkbox', { name: /galliano 2 1\/2 shots/i });
    userEvent.click(firstIngredient);
    // Verifica se o primeiro elemento ficou checked
    expect(firstIngredient.checked).toEqual(true);
  });
  it('Deve ir a tela de Done Recipes após clicar no botão Finish', async () => {
    // Renderiza na tela e espera o fetch acontecer
    global.localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: { 15997: ['Ginger ale', 'Ice', 'Galliano'] }, meals: {} }));
    const { history } = renderWithRouter(<App />, {
      initialEntries: [`/drinks/${ID_TEST}/in-progress`] });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    // Captura os elementos na tela
    const inputIngredients = screen.getAllByRole('checkbox');
    const finishButton = screen.getByRole('button', { name: /finish recipe/i });
    // Verifica se estão na tela
    expect(inputIngredients).toHaveLength(3);
    expect(finishButton).toBeInTheDocument();
    // Verifica se é possivel marcar os elementos como checked
    // inputIngredients.forEach((ingredient) => userEvent.click(ingredient));
    inputIngredients.forEach((ing) => expect(ing.checked).toEqual(true));
    // Verifica se o primeiro elemento ficou checked
    const finishedButton = screen.getByRole('button', { name: /finish recipe/i });
    await waitFor(() => expect(finishedButton).toBeEnabled());
    // Clica no botao e espera o redirecinamento
    userEvent.click(finishButton);
    // Verifica a rota
    const DONE_RECIPES_URL = '/done-recipes';
    expect(history.location.pathname).toBe(DONE_RECIPES_URL);
  });
  it('Deve ir a tela de Done Recipes após clicar no botão Finish', async () => {
    // Renderiza na tela e espera o fetch acontecer
    cleanup();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
    // global.localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: { 15997: ['Ginger ale', 'Ice', 'Galliano'] }, meals: {} }));
    renderWithRouter(<App />, {
      initialEntries: [`/meals/${ID_MEAL}/in-progress`] });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    // Captura os elementos na tela
    const inputIngredients = screen.getAllByRole('checkbox');
    const tittle = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
    const finishButton = screen.getByRole('button', { name: /finish recipe/i });
    // Verifica se estão na tela
    expect(inputIngredients).toHaveLength(8);
    expect(tittle).toBeInTheDocument();
    expect(finishButton).toBeInTheDocument();
  });
});
