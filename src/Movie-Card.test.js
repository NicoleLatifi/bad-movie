import React from 'react';
import MovieCard from './Movie-Card';
import { screen, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('MovieCard Component', () => {
  let movieSample
  beforeEach(() => {
    movieSample = {
            "id": 606234,
            "poster_path": "https://image.tmdb.org/t/p/original//eDnHgozW8vfOaLHzfpHluf1GZCW.jpg",
            "backdrop_path": "https://image.tmdb.org/t/p/original//u9YEh2xVAPVTKoaMNlB5tH6pXkm.jpg",
            "title": "Archive",
            "average_rating": 8.5,
            "release_date": "2020-08-13"
        }
  })
  it('Should have the correct content when rendered', () => {
    render (<MovieCard
      movie={movieSample}
      />)

      const movieAverageRating = screen.getByText("8.5/10");
      // const cardBackground = screen.getByAltText("background image of Archive poster")

      expect(movieAverageRating).toBeInTheDocument();
      // expect(cardBackground).toBeInTheDocument();
  });
});