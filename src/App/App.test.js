import MutationObserver from '@sheerun/mutationobserver-shim';
window.MutationObserver = MutationObserver;
import React from 'react';
import App from './App';
import { Router, MemoryRouter } from 'react-router-dom';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import { getAllMovies, getSingleMovie } from '../Fetch';
import '@testing-library/jest-dom';
jest.mock('../Fetch.js');

describe('App Tests', () => {
  let movies;
  beforeEach(() => {
    movies = [
      {
        id: 1,
        title: 'Greenland',
        poster_path: "https://image.tmdb.org/t/p/original//sA154deR0X51EcR2lm2FfDczryg.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original//juzEhsX92if2lJ2CSqKAI4RQswt.jpg",
        overview: 'Greenland overview',
        average_rating: 8
      },
      {
        id: 2,
        title: 'Archive',
        poster_path: "https://image.tmdb.org/t/p/original//eDnHgozW8vfOaLHzfpHluf1GZCW.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original//u9YEh2xVAPVTKoaMNlB5tH6pXkm.jpg",
        overview: 'Archive overview',
        average_rating: 9
      },
      {
        id: 3,
        title: 'Akira',
        poster_path: "https://image.tmdb.org/t/p/original//5KlRFKKSbyCiyYpZSS3A6G5bW0K.jpg",
        backdrop_path: "https://image.tmdb.org/t/p/original//qZ4NYuwME0j6QgJmIE6AZMgmCaj.jpg",
        overview: 'Akira overview',
        average_rating: 10
      },
    ];
  })

  it('Should display Movie Cards when rendered', async () => {

    getAllMovies.mockResolvedValueOnce(movies);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const header = await waitFor(() => screen.getByRole('heading', {name: 'Movies'} ))
    const movieAvgRating = await waitFor(() => screen.getByText('Avg8/10'));
    const movieCardLink = await waitFor(() => screen.getByTestId('1'));

    expect(movieAvgRating).toBeInTheDocument();
    expect(header).toBeInTheDocument();
    expect(movieCardLink).toBeInTheDocument();
  })

  it('Should render a Movie Page when a Movie Card is clicked', async () => {
    const singleMovie = {
      data: {
        movie: {
            id: 1,
            title: "Greenland",
            poster_path: "https://image.tmdb.org/t/p/original//sA154deR0X51EcR2lm2FfDczryg.jpg",
            backdrop_path: "https://image.tmdb.org/t/p/original//juzEhsX92if2lJ2CSqKAI4RQswt.jpg",
            release_date: "2020-07-29",
            overview: 'Greenland overview',
            genres: [
                "Action",
                "Science Fiction",
                "Thriller"
            ],
            budget: 0,
            revenue: 0,
            runtime: 119,
            tagline: "",
            average_rating: 8
        }
      },
      error: false
    };

    getAllMovies.mockResolvedValueOnce(movies);
    getSingleMovie.mockResolvedValueOnce(singleMovie);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const header = await waitFor(() => screen.getByRole('heading', {name: 'Movies'} ))
    const movieCardLink = await waitFor(() => screen.getByTestId('1'));

    await fireEvent.click(movieCardLink);

    const greenlandHeading = await waitFor(() => screen.getByRole('heading', {name: 'Greenland'}));
    const greenlandOverview = await waitFor(() => screen.getByText('Greenland overview'));

    expect(header).not.toBeInTheDocument();
    expect(movieCardLink).not.toBeInTheDocument();
    expect(greenlandHeading).toBeInTheDocument();
    expect(greenlandOverview).toBeInTheDocument();
  })
})
