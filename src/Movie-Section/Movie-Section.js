import React from 'react';
import MovieCard from '../Movie-Card/Movie-Card';
import './Movie-Section.css';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieSection = ({ movies, currentUser, favoriteMovies, addFavoriteMovie, getUsersFavoriteMovies }) => {
  const movieCards = movies.map((movie) => {
    return (
        <MovieCard movie={movie} currentUser={currentUser} favoriteMovies={favoriteMovies} addFavoriteMovie={addFavoriteMovie} getUsersFavoriteMovies={getUsersFavoriteMovies} />
    );
  });

  // const MovieSection = ({ movies, currentUser, addFavoriteMovie }) => {
  //   const movieCards = movies.map((movie) => {
  //     return (
  //       <Link to={`/movies/${movie.id}`} key={movie.id}>
  //         <MovieCard movie={movie} currentUser={currentUser} addFavoriteMovie={addFavoriteMovie} />
  //       </Link>
  //     );
  //   });

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
