import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const history = useHistory();

  const validateForm = () => {
    const minPasswordLength = 7;
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const isEmailValid = emailRegex.test(formData.email);
    const isPasswordValid = formData.password.length >= minPasswordLength;
    return !(isEmailValid && isPasswordValid);
  };
  const handleInputChanges = ({ target }) => {
    const { name, value } = target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email: formData.email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('drinksToken', 1);
    history.push('/meals');
  };
  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          name="email"
          data-testid="email-input"
          placeholder="Digite seu email"
          onChange={ handleInputChanges }
          value={ formData.email }
        />
        <input
          type="password"
          name="password"
          data-testid="password-input"
          onChange={ handleInputChanges }
          placeholder="Digite sua senha"
          value={ formData.password }
        />
        <button
          type="submit"
          disabled={ validateForm() }
          data-testid="login-submit-btn"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Login;
