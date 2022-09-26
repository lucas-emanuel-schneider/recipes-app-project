import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o componente Header', () => {
  it('Deve redirecionar o usuário corretamente ao clicar no botão de perfil', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(history.location.pathname).toBe('/meals');
    userEvent.click(screen.getByTestId('profile-top-btn'));
    expect(history.location.pathname).toBe('/profile');
  });
  it('Deve mostrar/esconder SearchBar corretamente', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(screen.queryByTestId('search-input')).toBeNull();
    userEvent.click(screen.getByTestId('search-top-btn'));
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });
});
