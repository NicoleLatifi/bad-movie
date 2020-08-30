import React from 'react';
import MovieCard from './Movie-Card';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('MovieCard Component', () => {
  let movieSample;
  beforeEach(() => {
    movieSample = {
      id: 606234,
      poster_path: 'https://image.tmdb.org/t/p/original//eDnHgozW8vfOaLHzfpHluf1GZCW.jpg',
      backdrop_path: 'https://image.tmdb.org/t/p/original//u9YEh2xVAPVTKoaMNlB5tH6pXkm.jpg',
      title: 'Archive',
      average_rating: 4.5,
      release_date: '2020-08-13',
    };
  });
  it('Should have the correct content when rendered', () => {
    render(<MovieCard movie={movieSample} />);

    const movieAverageRating = screen.getByText('Avg4.5/10');

    expect(movieAverageRating).toBeInTheDocument();
  });

  it('Should render the users rating if there is a current user with the rating', () => {
    let currentUser = { ratings: [{ movie_id: 606234, rating: 4 }] };
    render(<MovieCard movie={movieSample} currentUser={currentUser} />);

    const movieUserRating = screen.getByText('My Rating4/10');

    expect(movieUserRating).toBeInTheDocument();
  });
});
