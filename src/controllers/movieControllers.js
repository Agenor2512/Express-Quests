const database = require("../../database");

const getMovies = (_, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies);
      res.status(200);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id = ?", [id])
    .then(([movie]) => {
      if (movie[0] == null) {
        res.status(404).send("Not Found : No corresponding id");
      } else {
        console.log(movie);
        res.json(movie);
      }   
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
};

module.exports = {
  getMovies,
  getMovieById,
};
