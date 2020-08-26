import React, { Component } from 'react';
import MovieCard from '../Movie-Card/Movie-Card';
import './Movie-Section.css';
import { Link } from 'react-router-dom';

class MovieSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const movieCards = this.props.movies.map((movie) => {
      return (
        <Link to={`/movies/${movie.id}`}>
          <MovieCard movie={movie} currentUser={this.props.currentUser} />
        </Link>
      )
      // return (
      //   <Link to={`/movies/${movie.id}`}>
      //     <MovieCard movie={movie} currentUser={this.props.currentUser} key={movie.id} changeMovieSelected={this.props.changeMovieSelected} />
      //   </Link>
      // )
    });


    return (
      <section className='movies-section'>
        <h2 className='movies-section-header'>Movies</h2>
        <div className='movies-section-container'>{movieCards}</div>
      </section>
    );
  }
}

export default MovieSection;
