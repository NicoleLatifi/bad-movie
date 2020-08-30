import React from 'react';
import Header from './Header';
import { screen, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('Header Component', () => {
  // Things that rendered
  // Functions that fire in section
  // functions called with correct methods
  // if network request does app respond

  it('Should have the correct content when rendered without a current User', () => {
    render(
      <MemoryRouter>
        <Header currentUser={false} logoutUser={jest.fn()} />
      </MemoryRouter>
    );

    const badMovieLogo = screen.getByAltText('Bad Movie Logo');
    const loginButton = screen.getByText('Login');

    expect(badMovieLogo).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  // it('Should go to the /login endpoint when the login is clicked', () => {});

  // it('Should have the correct content when rendered with a currentUser', () => {
  //   render(<Header currentUser={{ name: 'Tyler' }} toggleLoginModal={jest.fn()} logoutUser={jest.fn()} />);

  //   const badMovieTitle = screen.getByText('Bad Movie');
  //   const badMovieLogo = screen.getByAltText('Bad Movie Logo');
  //   const welcomeMessage = screen.getByText('Hello Tyler');
  //   const logoutButton = screen.getByText('Logout');

  //   expect(badMovieTitle).toBeInTheDocument();
  //   expect(badMovieLogo).toBeInTheDocument();
  //   expect(logoutButton).toBeInTheDocument();
  //   expect(welcomeMessage).toBeInTheDocument();
  // });

  // it('Should fire a function when the logout button is clicked', () => {
  //   const mockLogoutUser = jest.fn();
  //   render(<Header currentUser={{ name: 'Nicole' }} toggleLoginModal={jest.fn()} logoutUser={mockLogoutUser} />);

  //   const button = screen.getByText('Logout');
  //   fireEvent.click(button);

  //   expect(mockLogoutUser).toBeCalledTimes(1);
  // });
});
