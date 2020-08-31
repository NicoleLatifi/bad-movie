import React from 'react';
import './Movie-Card.css';
import PropTypes from 'prop-types';
import unfilledHeart from '../white-heart.png';

const MovieCard = ({ currentUser, movie }) => {
  let usersRating;
  if (currentUser) {
    usersRating = currentUser.ratings.find((rating) => {
      return movie.id === rating.movie_id;
    });
  }

  return (
    <article
      className='movie-card'
      style={{ backgroundImage: `url(${movie.poster_path})` }}
      alt={`background image of ${movie.title} poster`}
      data-testid={movie.id}
    >
      <div className='heart-background'>
        <img className='heart-icon' src={unfilledHeart} alt='Unselected heart' />
      </div>
      <p className='movie-card-rating'>
        Avg<br></br>
        {Math.round(movie.average_rating * 10) / 10}/10
      </p>
      {usersRating && (
        <p className='movie-card-user-rating'>
          My Rating<br></br>
          {usersRating.rating}/10
        </p>
      )}
    </article>
  );
};

export default MovieCard;

MovieCard.propTypes = {
  movies: PropTypes.array,
}
