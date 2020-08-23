import React, { Component } from 'react';
import './Movie-Card.css';
import Fetch from './Fetch';

// const MovieCard = ({ movie, displayMoviePage }) => {
//   return (
//     <article className='movie-card' style={{ backgroundImage: `url(${movie.poster_path})` }} alt={`background image of ${movie.title} poster`} onClick={displayMoviePage}>
//       <p className='movie-card-rating'>{movie.average_rating}/10</p>
//     </article>
//   );
// };

class MovieCard extends Component {
  constructor(props) {
    super(props)
    this.fetch = new Fetch()
  }

  getMovieToDisplay = (event) => {
    event.preventDefault();
    this.fetch.getSingleMovie(this.props.movie.id)
    .then((data) => this.props.changeMovieSelected(data));
  }

  render() {
    return (
      <article className='movie-card' style={{ backgroundImage: `url(${this.props.movie.poster_path})` }} alt={`background image of ${this.props.movie.title} poster`} onClick={this.getMovieToDisplay}>
      <p className='movie-card-rating'>{this.props.movie.average_rating}/10</p>
      </article>
    );
  }
};

export default MovieCard;
