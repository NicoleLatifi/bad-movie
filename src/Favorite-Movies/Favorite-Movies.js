import React from 'react';
import MovieCard from '../Movie-Card/Movie-Card';
import './Favorite-Movies.css';
import PropTypes from 'prop-types';


const FavoriteMovies = ({ movie, currentUser, movies, favoriteMovies, addFavoriteMovie, getUsersFavoriteMovies }) => {
  const moviesToDisplay = [];
  movies.forEach((movie) => {
    favoriteMovies.forEach((favoriteMovie) => {
      if(favoriteMovie === movie.id) {
        moviesToDisplay.push(movie)
      }
    })
  })

  const movieCards = moviesToDisplay.map((favoriteMovie) => {
    return (
        <MovieCard movie={favoriteMovie} currentUser={currentUser} favoriteMovies={favoriteMovies} addFavoriteMovie={addFavoriteMovie} getUsersFavoriteMovies={getUsersFavoriteMovies} />
    );
  });

  return (
    <section className='favorite-movies'>
      <h2 className='favorite-movies-header'>Favorite Movies</h2>
      {!favoriteMovies.length && <p className='no-favorites-message'>You don't have any favorited movies yet. Go back to start favoriting!</p>}
      <div className='favorite-movies-container'>{movieCards}</div>
    </section>
  );
};

export default FavoriteMovies;

FavoriteMovies.propTypes = {
  movies: PropTypes.array,
};
