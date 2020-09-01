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
    });
};

export const deleteRatingForUser = (userId, ratingId) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings/${ratingId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
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

export const getFavoriteMovies = () => {
  return fetch('http://localhost:3001/api/v1/favorites')
    .then((response) => response.json())
    .then((data) => {
      return data
    });
};

export const addFavoriteMovie = (movieId) => {
  const stringyId = JSON.stringify({ id: movieId });
  return fetch(`http://localhost:3001/api/v1/favorites`, {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: stringyId,
  })
    .then((response) => {
      return response.json();
    })
    .then((message) => {
      console.log(message)
    });
};
