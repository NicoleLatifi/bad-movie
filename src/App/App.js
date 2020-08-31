import React, { Component } from 'react';
import Header from '../Header/Header';
import Login from '../Login/Login';
import MovieSection from '../Movie-Section/Movie-Section';
import { getUsersRatings, getAllMovies, addRatingForUser, deleteRatingForUser } from '../Fetch';
import MoviePage from '../Movie-Page/Movie-Page';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      error: '',
      currentUser: false,
    };
  }

  rateMovie = (ratingInput, movieId) => {
    const postingUser = this.state.currentUser;
    addRatingForUser(postingUser.id, movieId, ratingInput)
      .then((rating) => {
        this.changeUser(this.state.currentUser);
      })
      .catch((error) => {
        this.setState({ error: 'Something went wrong accepting that rating' });
      });
  };

  deleteMovieRating = async (ratingId) => {
    const deletingUser = this.state.currentUser;
    try {
      await deleteRatingForUser(deletingUser.id, ratingId);
    } catch (error) {
      console.log(error);
      this.setState({ error: 'Something went wrong deleting this rating' });
    }
    this.changeUser(this.state.currentUser);
  };

  changeUser = (userData) => {
    getUsersRatings(userData.id)
      .then((userRatings) => {
        userData.ratings = userRatings;
        this.setState({ currentUser: userData });
      })
      .catch((error) => {
        this.setState({ error: 'Something went wrong getting your saved ratings' });
      });
  };

  logoutUser = () => {
    this.setState({ currentUser: false });
  };

  componentDidMount() {
    getAllMovies()
      .then((movies) => {
        this.setState({ movies, error: '' });
      })
      .catch((err) => {
        this.setState({ error: "We're Sorry Something Went Wrong Try Again Later" });
      });
  }

  render() {
    const { currentUser, movies, error } = this.state;
    return (
      <div className='App'>
        <Header logoutUser={this.logoutUser} currentUser={this.state.currentUser} />
        {error && <h2>{error}</h2>}
        <Switch>
          <Route
            exact
            path='/'
            render={() => {
              return <MovieSection movies={movies} currentUser={currentUser} />;
            }}
          />
          <Route
            path='/movies/:movieId'
            render={({ match }) => {
              const movieSelected = movies.find((movie) => movie.id === parseInt(match.params.movieId));
              return <MoviePage movie={movieSelected} currentUser={currentUser} rateMovie={this.rateMovie} deleteMovieRating={this.deleteMovieRating} />;
            }}
          />
        </Switch>
        <Route
          path='/login'
          render={() => {
            return <Login changeUser={this.changeUser} />;
          }}
        />
      </div>
    );
  }
}

export default App;
