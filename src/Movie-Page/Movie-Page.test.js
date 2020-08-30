import React from 'react';
import MoviePage from './Movie-Page';
import { waitFor, screen, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { getSingleMovie } from '../Fetch';
import MutationObserver from '@sheerun/mutationobserver-shim';
window.MutationObserver = MutationObserver;
jest.mock('../Fetch.js');

describe('Movie Page Component', () => {
  let movieSelected;
  beforeEach(() => {
    movieSelected = {
      id: 1,
      title: 'Akira',
      poster_path: 'https://image.tmdb.org/t/p/original//5KlRFKKSbyCiyYpZSS3A6G5bW0K.jpg',
      backdrop_path: 'https://image.tmdb.org/t/p/original//qZ4NYuwME0j6QgJmIE6AZMgmCaj.jpg',
      release_date: '1988-07-16',
      overview: 'A secret military project.',
      genres: ['Science Fiction', 'Animation'],
      budget: 10000000,
      revenue: 0,
      runtime: 100,
      tagline: 'E.X.P.L.O.D.E.',
      average_rating: 6,
    };
  });

  it('Should have the correct content when rendered without a current User on the Movie Page', async () => {
    getSingleMovie.mockResolvedValue({
      data: { movie: movieSelected },
      error: false,
    });
    render(
      <MemoryRouter>
        <MoviePage movie={movieSelected} currentUser={false} rateMovie={jest.fn()} deleteMovieRating={jest.fn()} />
      </MemoryRouter>
    );

    const backButton = screen.getByRole('button', { name: 'Back' });
    const movieTitle = await waitFor(() => screen.getByRole('heading', { name: 'Akira' }));
    const movieTagline = await waitFor(() => screen.getByRole('heading', { name: 'E.X.P.L.O.D.E.' }));
    const movieOverview = await waitFor(() => screen.getByText('A secret military project.'));
    const movieRuntime = await waitFor(() => screen.getByText('Runtime: 100 minutes'));
    const movieAvgRating = await waitFor(() => screen.getByText('Average Rating: 6/10'));

    expect(backButton).toBeInTheDocument();
    expect(movieTitle).toBeInTheDocument();
    expect(movieTagline).toBeInTheDocument();
    expect(movieOverview).toBeInTheDocument();
    expect(movieRuntime).toBeInTheDocument();
    expect(movieAvgRating).toBeInTheDocument();
  });

  it('Should have the correct ratings rendered with a current User that has a rating', async () => {
    getSingleMovie.mockResolvedValue({
      data: { movie: movieSelected },
      error: false,
    });
    const mockCurrentUser = { ratings: [{ movie_id: 1, rating: 10 }] };
    render(
      <MemoryRouter>
        <MoviePage movie={movieSelected} currentUser={mockCurrentUser} rateMovie={jest.fn()} deleteMovieRating={jest.fn()} />
      </MemoryRouter>
    );

    const ratingCard = screen.getByRole('heading', { name: 'My Ratings' });
    const userRating = screen.getByText('10/10');
    const deleteButton = screen.getByRole('button', { name: 'Delete' });

    expect(ratingCard).toBeInTheDocument();
    expect(userRating).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it('Should have the correct render with a current User that does not have a rating', async () => {
    getSingleMovie.mockResolvedValue({
      data: { movie: movieSelected },
      error: false,
    });
    const mockCurrentUser = { ratings: [] };
    render(
      <MemoryRouter>
        <MoviePage movie={movieSelected} currentUser={mockCurrentUser} rateMovie={jest.fn()} deleteMovieRating={jest.fn()} />
      </MemoryRouter>
    );

    const ratingCard = screen.getByRole('heading', { name: 'Rate This Movie' });
    const ratingLabel = screen.getByRole('slider', { name: 'My Rating: 10' });
    const rateButton = screen.getByRole('button', { name: 'Rate!' });

    expect(ratingCard).toBeInTheDocument();
    expect(ratingLabel).toBeInTheDocument();
    expect(rateButton).toBeInTheDocument();
  });

  // it('Should fire a function when the back button is clicked', () => {
  //   const mockToggleMoviePage = jest.fn();
  //   render(<MoviePage movie={movieSelected} toggleMoviePage={mockToggleMoviePage} />);

  //   const button = screen.getByText('Back');
  //   fireEvent.click(button);

  //   expect(mockToggleMoviePage).toBeCalledTimes(1);
  // });
});
