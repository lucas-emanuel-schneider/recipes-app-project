import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import beefMeals from '../../cypress/mocks/beefMeals';

const SEARCH_TOP_BTN_ID = 'search-top-btn';
const SEARCH_INPUT_ID = 'search-input';
const NAME_RADIO_ID = 'name-search-radio';
const FIRST_LETTER_RADIO_ID = 'first-letter-search-radio';
const EXEC_BTN_ID = 'exec-search-btn';

describe('Testa o componente SearchBar', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });

  it('Deve mostrar alerta se não retornar nada com a busca', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    global.alert = jest.fn();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN_ID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_ID), 'xablau');
    userEvent.click(screen.getByTestId(NAME_RADIO_ID));
    userEvent.click(screen.getByTestId(EXEC_BTN_ID));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=xablau');
    });

    expect(screen.queryByTestId('0-recipe-card')).not.toBeInTheDocument();
  });
  it('Deve ser possivel filtar por ingredientes', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN_ID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_ID), 'Chicken');
    userEvent.click(screen.getByTestId(EXEC_BTN_ID));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
      mealsByIngredient.meals.forEach((meal, index) => {
        expect(screen.getByTestId(`${index}-recipe-card`));
      });
    });
  });
  it('Deve ser possivel filtar por nome', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN_ID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_ID), 'Arrabiata');
    userEvent.click(screen.getByTestId(NAME_RADIO_ID));
    userEvent.click(screen.getByTestId(EXEC_BTN_ID));

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata');
      expect(history.location.pathname).toBe('/meals/52771');
    });
  });
  it('Deve ser possivel filtar por first letter', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals),
    });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN_ID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_ID), 'b');
    userEvent.click(screen.getByTestId(FIRST_LETTER_RADIO_ID));
    userEvent.click(screen.getByTestId(EXEC_BTN_ID));

    const meals = beefMeals.meals.filter((meal, index) => index < 12);

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=b');
      meals.forEach((meal, index) => {
        expect(screen.getByTestId(`${index}-recipe-card`));
      });
    });
  });
  it('Deve mostrar alerta ao tentar filtar por first letter com mais de uma letra', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    global.alert = jest.fn();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN_ID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_ID), 'xablau');
    userEvent.click(screen.getByTestId(FIRST_LETTER_RADIO_ID));
    userEvent.click(screen.getByTestId(EXEC_BTN_ID));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });
});
