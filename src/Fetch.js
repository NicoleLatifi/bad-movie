class Fetch {
  getAllMovies() {
    return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
      .then((response) => response.json())
      .then((data) => {
        return data.movies;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default Fetch;
