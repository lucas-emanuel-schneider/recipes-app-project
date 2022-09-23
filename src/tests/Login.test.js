import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('testando componente Login', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  render(<App />);
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
