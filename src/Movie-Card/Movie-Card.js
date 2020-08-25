import React, { Component } from 'react';
import './Movie-Card.css';
import Fetch from '../Fetch';

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
    this.fetch = new Fetch();
  }

  getMovieToDisplay = (event) => {
    event.preventDefault();
    this.fetch.getSingleMovie(this.props.movie.id).then(({ data, error }) => {
      if (error) {
        this.setState({ error });
      } else {
        this.props.changeMovieSelected(data.movie);
      }
    });
  };

  render() {
    let usersRating;
    const { currentUser, movie } = this.props;
    if (currentUser) {
      usersRating = currentUser.ratings.find((rating) => {
        return movie.id === rating.movie_id;
      });
    }
    return (
      <article className='movie-card' style={{ backgroundImage: `url(${movie.poster_path})` }} alt={`background image of ${movie.title} poster`} onClick={this.getMovieToDisplay}>
        {this.state.error && <p>Sorry, no movie details to display.</p>}
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
  }
}

export default MovieCard;
