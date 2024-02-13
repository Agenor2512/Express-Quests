const database = require("../../database");

const getMovies = (_, response) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      response.json(movies);
      response.status(200);
    })
    .catch((err) => {
      console.error(err);
      response.status(500);
    });
};

const getMovieById = (request, response) => {
  const id = parseInt(request.params.id);

  database
    .query("select * from movies where id = ?", [id])
    .then(([movie]) => {
      if (movie[0] == null) {
        response.status(404).send("Not Found : No corresponding id");
      } else {
        console.log(movie);
        response.json(movie);
      }   
    })
    .catch((err) => {
      console.error(err);
      response.status(500);
    });
};

const postMovie = (request, response) => {
  const { title, director, year, color, duration } = request.body;

  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      response.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      response.status(500);
    })
};

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
};
