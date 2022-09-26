import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const testEmail = 'teste@trybe.com';
const testPassword = '1234567';
const profileRoute = '/profile';
describe('testando componente Profile', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  it('Testa o componente "Profile"', () => {
    // Renderiza
    const { history } = renderWithRouter(<App />);
    // Captura os elementos
    const inputEmail = screen.getByPlaceholderText(/digite seu email/i);
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const buttonSubmit = screen.getByRole('button', {
      name: /enviar/i,
    });
    // escreve os valores no input
    userEvent.type(inputEmail, testEmail);
    userEvent.type(inputPassword, testPassword);
    // Clica no Botão de Submit
    userEvent.click(buttonSubmit);
    history.push('/profile');
    // Verifica se estão na tela
    expect(history.location.pathname).toBe(profileRoute);
    const emailText = screen.getByTestId('profile-email');
    const doneRecipesButton = screen.getByRole('button', { name: /done/i });
    const favoriteRecipesButton = screen.getByRole('button', { name: /favorite/i });
    const logoutButton = screen.getByRole('button', { name: /logout/i });

    expect(emailText).toBeInTheDocument();
    expect(doneRecipesButton).toBeInTheDocument();
    expect(favoriteRecipesButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
  it('Testando botão "Done Recipes"', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });
    // const { history } = renderWithRouter(<App />, ['/profile', '/done-recipes']);
    const doneRecipesButton = screen.getByRole('button', { name: /done/i });

    userEvent.click(doneRecipesButton);

    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('Testando botão "Favorite Recipes"', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });
    // const { history } = renderWithRouter(<App />, ['/profile', '/done-recipes']);
    const favoriteRecipesButton = screen.getByRole('button', { name: /favorite/i });

    userEvent.click(favoriteRecipesButton);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('Testando botão "Logout"', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });
    // const { history } = renderWithRouter(<App />, ['/profile', '/done-recipes']);
    const logoutButton = screen.getByRole('button', { name: /logout/i });

    userEvent.click(logoutButton);

    expect(history.location.pathname).toBe('/');
  });
});
