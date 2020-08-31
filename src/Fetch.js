export const getAllMovies = () => {
  return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
    .then((response) => response.json())
    .then((data) => {
      return data.movies;
    });
};

export const getSingleMovie = (movieId) => {
  let data, error;
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${movieId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.hasOwnProperty('error')) {
        throw new Error(data.error);
      }
      return { data, error };
    })
    .catch((error) => {
      return { data, error: error.message };
    });
};

export const getUsersRatings = (userId) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings`)
    .then((response) => response.json())
    .then((data) => {
      return data.ratings;
    });
};

export const addRatingForUser = (userId, movieId, ratingInt) => {
  const stringyRating = JSON.stringify({ movie_id: movieId, rating: parseInt(ratingInt) });
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings`, {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: stringyRating,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.rating;
    })
    .catch((err) => console.log(err));
};

export const deleteRatingForUser = (userId, ratingId) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings/${ratingId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((returnedData) => console.log(returnedData))
    .catch((err) => console.log(err));
};

export const loginUser = (username, password) => {
  let data, error;
  const stringyUser = JSON.stringify({ email: username, password });
  return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: stringyUser,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.hasOwnProperty('error')) {
        throw new Error(data.error);
      }
      return { data, error };
    })
    .catch((error) => {
      return { data, error: error.message };
    });
};
