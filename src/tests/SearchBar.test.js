import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';
import beefMeals from '../../cypress/mocks/beefMeals';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';

window.alert = jest.fn();

const SEARCH_TOP_BTN_ID = 'search-top-btn';
const SEARCH_INPUT_ID = 'search-input';
const NAME_RADIO_ID = 'name-search-radio';
const FIRST_LETTER_RADIO_ID = 'first-letter-search-radio';
const EXEC_BTN_ID = 'exec-search-btn';

describe('Testa o componente SearchBar', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });

  it('Deve ser possivel filtar meals por ingredientes', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN_ID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_ID), 'Chicken');
    userEvent.click(screen.getByTestId(EXEC_BTN_ID));

    const meals = mealsByIngredient.meals.slice(0, 12);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
      meals.forEach((meal, index) => {
        expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      });
    });
  });

  it('Deve ser possivel filtar drinks por ingredientes', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN_ID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_ID), 'Light rum');
    userEvent.click(screen.getByTestId(EXEC_BTN_ID));

    const drinks = drinksByIngredient.drinks.slice(0, 12);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum');
      drinks.forEach((meal, index) => {
        expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      });
    });
  });

  it('Deve ser possivel filtar meals por nome', async () => {
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

  it('Deve ser possivel filtar drinks por nome', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN_ID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_ID), 'Aquamarine');
    userEvent.click(screen.getByTestId(NAME_RADIO_ID));
    userEvent.click(screen.getByTestId(EXEC_BTN_ID));

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine');
      expect(history.location.pathname).toBe('/drinks/178319');
    });
  });

  it('Deve ser possivel filtar meals por first letter', async () => {
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

    const meals = beefMeals.meals.slice(0, 12);

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=b');
      meals.forEach((meal, index) => {
        expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      });
    });
  });

  it('Deve ser possivel filtar drinks por first letter', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals),
    });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN_ID));
    userEvent.type(screen.getByTestId(SEARCH_INPUT_ID), 'a');
    userEvent.click(screen.getByTestId(FIRST_LETTER_RADIO_ID));
    userEvent.click(screen.getByTestId(EXEC_BTN_ID));

    const drinks = cocktailDrinks.drinks.slice(0, 12);

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
      drinks.forEach((meal, index) => {
        expect(screen.getByTestId(`${index}-recipe-card`)).toBeInTheDocument();
      });
    });
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
