import React from 'react';
import MovieCard from '../Movie-Card/Movie-Card';
import './Movie-Section.css';
import PropTypes from 'prop-types';

const MovieSection = ({ movies, currentUser, favoriteMovies, addFavoriteMovie, getUsersFavoriteMovies }) => {
  const movieCards = movies.map((movie) => {
    return (
        <MovieCard
          movie={movie}
          currentUser={currentUser}
          favoriteMovies={favoriteMovies}
          addFavoriteMovie={addFavoriteMovie}
          getUsersFavoriteMovies={getUsersFavoriteMovies}
          key={movie.id}
        />
    );
  });

  return (
    <section className='movies-section'>
      <h2 className='movies-section-header'>Movies</h2>
      <div className='movies-section-container'>{movieCards}</div>
    </section>
  );
};

export default MovieSection;

MovieSection.propTypes = {
  movies: PropTypes.array,
};
