import React from 'react';
import FavoriteMovies from './Favorite-Movies';
import { screen, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Favorite-Movies Component', () => {
  it('Should have the correct content when user has no favorite movies', () => {
    render (<FavoriteMovies
      favoriteMovies={[]} movies={[]}
      />)

      const favoriteMoviesTitle = screen.getByText("Favorite Movies")
      const noFavoritesMessage = screen.getByText("You don't have any favorited movies yet. Go back to start favoriting!")

      expect(favoriteMoviesTitle).toBeInTheDocument();
      expect(noFavoritesMessage).toBeInTheDocument();
  });
})
