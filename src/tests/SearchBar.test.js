import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mealsMock from './helpers/mealsMock';

describe('Testa o componente SearchBar', () => {
  it('Deve ser possível escrever e filtrar', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsMock),
    });

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    expect(screen.queryAllByTestId(/recipe-card/i)).toEqual([]);

    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('search-top-btn'));

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();
    userEvent.type(screen.getByTestId('search-input'), 'orange');
    userEvent.click(screen.getByTestId('exec-search-btn'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=orange');
    });

    await waitFor(() => {
      mealsMock.meals.forEach((meal, index) => {
        expect(screen.getByTestId(`${index}-recipe-card`));
      });
    });
  });
});
