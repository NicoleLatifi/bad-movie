import React, { Component } from 'react';
import './Movie-Page.css';
import { getSingleMovie } from '../Fetch';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import filledHeart from '../black-heart.png';
import unfilledHeart from '../white-heart.png';
import { addFavoriteMovie } from '../Fetch';

class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingInput: 10,
      selectedMovie: {},
      favorited: false,
      error: '',
    };
  }

  componentDidMount() {
    getSingleMovie(this.props.movie.id).then(({ data, error }) => {
      if (error) {
        this.setState({ error });
      } else {
        this.setState({ selectedMovie: data.movie });
      }
    });
    const foundMovie = this.props.favoriteMovies.find(favoriteMovie => {
      return favoriteMovie === this.props.movie.id
    })
    if(foundMovie) {
      this.setState({ favorited: true})
    }
  }

  getUserMovieRating = () => {
    return this.props.currentUser.ratings.find((rating) => {
      return this.props.movie.id === rating.movie_id;
    });
  };

  updateRatingInput = (event) => {
    this.setState({ ratingInput: event.target.value });
  };

  rateMovieForUser = () => {
    this.props.rateMovie(this.state.ratingInput, this.props.movie.id);
  };

  deleteMyRating = () => {
    this.props.deleteMovieRating(this.getUserMovieRating().id);
  };

  favoriteMovie = async () => {
    addFavoriteMovie(this.props.movie.id);
    await this.setState({ favorited: !this.state.favorited });
    await this.props.getUsersFavoriteMovies();
  }

  render() {
    const { currentUser } = this.props;
    const { selectedMovie, favorited } = this.state;
    let currentUsersRating;
    if (currentUser) {
      currentUsersRating = this.getUserMovieRating();
    }
    return (
      <section className='movie-page' style={{ backgroundImage: `url(${selectedMovie.backdrop_path})` }}>
        <Link to='/'>
          <button className='movie-page-back-button'>Back</button>
        </Link>
        <article className='movie-descriptions'>
          <h2 className='movie-description-title'>{selectedMovie.title}</h2>
          <h3 className='movie-description-tagline'>{selectedMovie.tagline}</h3>
          <p className='movie-description-overview'>{selectedMovie.overview}</p>
          <p className='movie-description-stats'>Runtime: {selectedMovie.runtime} minutes</p>
          <p className='movie-description-ratings'> Average Rating: {Math.round(selectedMovie.average_rating * 10) / 10}/10</p>
        </article>
        {currentUser && (
          <aside className='movie-page-rating-card'>
            {currentUser && !favorited &&
              <div className='movie-page-heart-background'>
                <img className='movie-page-heart-icon' src={unfilledHeart} alt='Unselected heart' onClick={this.favoriteMovie} />
              </div>
            }
            {currentUser && favorited &&
              <div className='movie-page-heart-background'>
                <img className='movie-page-heart-icon' src={filledHeart} alt='Unselected heart' onClick={this.favoriteMovie} />
              </div>
            }
            {currentUsersRating && (
              <div>
                <h2 className='rating-card-title'>My Ratings</h2>
                <p className='rating-card-user-rating'>{currentUsersRating.rating}/10</p>
                <button className='delete-button' onClick={this.deleteMyRating}>
                  Delete
                </button>
              </div>
            )}
            {!currentUsersRating && (
              <div>
                <h2 className='rate-this-movie'>Rate This Movie</h2>
                <label htmlFor='my-rating' className='my-rating'>
                  My Rating: {this.state.ratingInput}
                </label>
                <input type='range' id='my-rating' name='my-rating' min='1' max='10' onChange={this.updateRatingInput}></input>
                <button className='add-rating-button' onClick={this.rateMovieForUser}>
                  Rate!
                </button>
              </div>
            )}
          </aside>
        )}
      </section>
    );
  }
}

export default MoviePage;

MoviePage.propTypes = {
  movie: PropTypes.object,
  rateMovie: PropTypes.func,
  deleteMovieRating: PropTypes.func,
};
