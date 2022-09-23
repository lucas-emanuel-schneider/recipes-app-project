import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

test('testando componente Login', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  renderWithRouter(<App />);
  const inputEmail = screen.getByPlaceholderText(/digite seu email/i);
  const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
  const buttonSubmit = screen.getByRole('button', {
    name: /enviar/i,
    value: false,
  });
  expect(inputEmail).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();
  expect(buttonSubmit).toBeInTheDocument();
});
