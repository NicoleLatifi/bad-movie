import React from 'react';
import './Movie-Card.css';

const MovieCard = () => {
  let usersRating;
  const { currentUser, movie } = this.props;
  if (currentUser) {
    usersRating = currentUser.ratings.find((rating) => {
      return movie.id === rating.movie_id;
    });
  }

  return (
    <article className='movie-card' style={{ backgroundImage: `url(${movie.poster_path})` }} alt={`background image of ${movie.title} poster`}>
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
