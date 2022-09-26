import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('testando componente Footer', () => {
  it('Testa se o componente Footer possui os elementos', () => {
    // Renderiza
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    // Verifica se a rota está correta
    expect(history.location.pathname).toBe('/meals');
    // Captura os elementos
    const drinksImgFooter = screen.getByRole('img', {
      name: /drinkicon/i,
    });
    const mealsImgFooter = screen.getByRole('img', {
      name: /mealicon/i,
    });
    // Verifica se estão na tela
    expect(drinksImgFooter).toBeInTheDocument();
    expect(mealsImgFooter).toBeInTheDocument();
  });
  it('Testa se é direcionado corretamente ao clicar no icone Drinks em footer', () => {
    // Renderiza
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    // Captura os elementos
    const drinksImgFooter = screen.getByRole('img', {
      name: /drinkicon/i,
    });
    // Clica no Link de drinks
    userEvent.click(drinksImgFooter);
    // Verifica se foi redirecionado para /drinks
    expect(history.location.pathname).toBe('/drinks');
  });
  it('Testa se é direcionado corretamente ao clicar no icone Meals em footer', () => {
    // Renderiza
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    // Captura os elementos
    const mealsImgFooter = screen.getByRole('img', {
      name: /mealicon/i,
    });
    // Clica no Link de drinks
    userEvent.click(mealsImgFooter);
    // Verifica se foi redirecionado para /drinks
    expect(history.location.pathname).toBe('/meals');
  });
});
