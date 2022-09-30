import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import notFavIcon from '../images/whiteHeartIcon.svg';
import favIcon from '../images/blackHeartIcon.svg';

describe('Testa o componente FavoriteButton', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });

  it('Deve ser possivel favoritar/desfavoritar receita na tela de detalhes', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/52771'] });

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
    });

    expect(screen.getByTestId(/favorite-btn/i).src).toContain(notFavIcon);

    userEvent.click(screen.getByTestId(/favorite-btn/i));

    await waitFor(() => {
      expect(screen.getByTestId(/favorite-btn/i).src).toContain(favIcon);
    });

    userEvent.click(screen.getByTestId(/favorite-btn/i));

    await waitFor(() => {
      expect(screen.getByTestId(/favorite-btn/i).src).toContain(notFavIcon);
    });
  });
});
