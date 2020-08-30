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

  it('Should fire functions when the submit button is clicked', async () => {
    const mockChangeUser = jest.fn();

    render(
      <MemoryRouter>
        <Login changeUser={mockChangeUser} />
      </MemoryRouter>
    );

    const mockedUser = {data: {user: {id: 1, name: "Alan", email: "alan@turing.io"}}}

    loginUser.mockResolvedValueOnce(mockedUser);

    const submitButton = await waitFor(() => screen.getByRole('button', { name: 'Submit' }))
    fireEvent.click(submitButton);

    expect(mockChangeUser).toBeCalledTimes(1);

    // I think this is passing because if you make this change:
    // mockedUser = {user: {id: 1, name: "Alan", email: "alan@turing.io"}}
    // You get the error Cannot read property 'user' of undefined at src/Login/Login.js:23:34
    // So attemptLogin is being called
    // And if you make this change in Login.js:
    // this.props.changeUser(console.log('hi'))
    // It logs 'hi'
  });
})
