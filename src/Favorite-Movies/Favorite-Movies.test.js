import MutationObserver from '@sheerun/mutationobserver-shim';
window.MutationObserver = MutationObserver;
import React from 'react';
import FavoriteMovies from './Favorite-Movies';
import { MemoryRouter } from 'react-router-dom';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';
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

  it('Should have the correct content when user has favortie movies', async () => {
    const movies = [
      {
      "id": 1,
       "poster_path": "https://image.tmdb.org/t/p/original//sA154deR0X51EcR2lm2FfDczryg.jpg",
       "backdrop_path": "https://image.tmdb.org/t/p/original//juzEhsX92if2lJ2CSqKAI4RQswt.jpg",
       "title": "Greenland",
       "average_rating": 8,
       "release_date": "2020-07-29"
     },
     {
       "id": 2,
       "poster_path": "https://image.tmdb.org/t/p/original//eDnHgozW8vfOaLHzfpHluf1GZCW.jpg",
       "backdrop_path": "https://image.tmdb.org/t/p/original//u9YEh2xVAPVTKoaMNlB5tH6pXkm.jpg",
       "title": "Archive",
       "average_rating": 9,
       "release_date": "2020-08-13"
     },
     {
       "id": 3,
       "poster_path": "https://image.tmdb.org/t/p/original//5KlRFKKSbyCiyYpZSS3A6G5bW0K.jpg",
       "backdrop_path": "https://image.tmdb.org/t/p/original//qZ4NYuwME0j6QgJmIE6AZMgmCaj.jpg",
       "title": "Akira",
       "average_rating": 10,
       "release_date": "1988-07-16"
     }
   ]
   const favoriteMovies = [1]

    render (
      <MemoryRouter>
        <FavoriteMovies
        favoriteMovies={favoriteMovies} movies={movies}
        />)
      </MemoryRouter>
    );

    const header = await waitFor(() => screen.getByRole('heading', {name: 'Favorite Movies'} ))
    const movieAvgRating = await waitFor(() => screen.getByText('Avg8/10'));
    const movieCardLink = await waitFor(() => screen.getByTestId('1'));

    expect(movieAvgRating).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(movieCardLink).toBeInTheDocument();
  })
})
