import React, { Component } from 'react';
import './Movie-Card.css';
import PropTypes from 'prop-types';
import unfilledHeart from '../white-heart.png';
import filledHeart from '../black-heart.png';
import { Link } from 'react-router-dom';
import { addFavoriteMovie } from '../Fetch';

class MovieCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      favorited: false,
    }
  }

  componentDidMount() {
    const foundMovie = this.props.favoriteMovies.find(favoriteMovie => {
      return favoriteMovie === this.props.movie.id
    })
    if(foundMovie) {
      this.setState({ favorited: true})
    }
  }

  favoriteMovie = async () => {
    addFavoriteMovie(this.props.movie.id);
    await this.setState({ favorited: !this.state.favorited });
    await this.props.getUsersFavoriteMovies();
  }

  render() {
    const { currentUser, movie } = this.props;
    const { favorited } = this.state;
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
        {currentUser && !favorited &&
          <div className='heart-background'>
            <img className='heart-icon' src={unfilledHeart} alt='Unselected heart' onClick={this.favoriteMovie} />
          </div>
        }
        {currentUser && favorited &&
          <div className='heart-background'>
            <img className='heart-icon' src={filledHeart} alt='Selected heart' onClick={this.favoriteMovie} />
          </div>
        }
        <Link to={`/movies/${movie.id}`}>
          <div className='clickable'>
          </div>
        </Link>
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
}


export default MovieCard;

MovieCard.propTypes = {
  movies: PropTypes.array,
}
