import MutationObserver from '@sheerun/mutationobserver-shim';
window.MutationObserver = MutationObserver;
import React from 'react';
import Login from './Login';
import { Router, MemoryRouter } from 'react-router-dom';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import { loginUser } from '../Fetch';
import '@testing-library/jest-dom';
jest.mock('../Fetch.js');

describe('Login Component', () => {
  beforeEach(() => {

  });
  it('Should have the correct content when rendered', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const loginHeader = screen.getByRole('heading', { name: 'Login' });
    const usernameLabel = screen.getByRole('textbox', { name: 'username:' });
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    expect(loginHeader).toBeInTheDocument();
    expect(usernameLabel).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('Should change user when the submit with valid user information', async () => {
    const mockChangeUser = jest.fn();

    const foundUser = {data: {user: {id: 1, name: "Alan", email: "alan@turing.io"}}, error: false }
    loginUser.mockResolvedValue(foundUser);

    render(
      <MemoryRouter>
        <Login changeUser={mockChangeUser} />
      </MemoryRouter>
    );

    const submitButton = await waitFor(() => screen.getByRole('button', { name: 'Submit' }))
    await fireEvent.click(submitButton);

    expect(mockChangeUser).toBeCalledTimes(1);
  });

  it('Should NOT change user when the submit with invalid user information', async () => {
    const mockChangeUser = jest.fn();

    const foundUser = { error: 'Username or password is incorrect' }
    loginUser.mockResolvedValue(foundUser);


    render(
      <MemoryRouter>
        <Login changeUser={mockChangeUser} />
      </MemoryRouter>
    );

    const submitButton = await waitFor(() => screen.getByRole('button', { name: 'Submit' }))
    await fireEvent.click(submitButton);

    const errorMessage = await waitFor(() => screen.getByText('Username or password is incorrect'))
    const loginHeader = await waitFor(() =>screen.getByRole('heading', { name: 'Login' }));

    expect(mockChangeUser).toBeCalledTimes(0);
    expect(errorMessage).toBeInTheDocument();
    expect(loginHeader).toBeInTheDocument();
  });
})
