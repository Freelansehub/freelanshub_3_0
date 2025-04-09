import { screen } from '@testing-library/react';
import React from 'react';
import App from '../../src/App';
import { renderWithRouter } from '../helpers/renderWithRouter';
import renderWithReduxAndRouter from '../helpers/renderWithReduxAndRoute';

describe('App Component', () => {

  it('renders app routs the home', () => {
    renderWithReduxAndRouter(<App />);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
  it('renders app routs the login', () => {
    renderWithReduxAndRouter(<App />, '/login');
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
});

