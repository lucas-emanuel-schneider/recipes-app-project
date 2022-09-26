import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const testEmail = 'teste@trybe.com';
const mealsRoute = '/meals';
const testPassword = '1234567';

describe('testando componente Login', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  it('Testa se o componente Login possui os inputs e o button', () => {
    // Renderiza
    const { history } = renderWithRouter(<App />);
    // Verifica se a rota está correta
    expect(history.location.pathname).toBe('/');
    // Captura os elementos
    const inputEmail = screen.getByPlaceholderText(/digite seu email/i);
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const buttonSubmit = screen.getByRole('button', {
      name: /enviar/i,
      value: false,
    });
    // Verifica se estão na tela
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
  });
  it('Verifica se o botão é Habilitado se os valores estão corretos', () => {
    // Renderiza
    renderWithRouter(<App />);
    // Captura os elementos
    const inputEmail = screen.getByPlaceholderText(/digite seu email/i);
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const buttonSubmit = screen.getByRole('button', {
      name: /enviar/i,
    });
    // escreve os valores no input
    userEvent.type(inputEmail, testEmail);
    userEvent.type(inputPassword, testPassword);
    // Verifica se estão na tela
    expect(buttonSubmit).toBeEnabled();
  });
  it('Verifica se ao logar corretamente a página, ela é redirecionada a /meals', () => {
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
    // Verifica se estão na tela
    expect(history.location.pathname).toBe(mealsRoute);
  });
});
