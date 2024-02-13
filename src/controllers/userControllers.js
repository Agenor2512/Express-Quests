const database = require("../../database")

const getUsers = (_, response) => {
  database
    .query("select * from users")
    .then(([users]) => {
      response.json(users);
      response.status(200);
    })
    .catch((err) => {
      console.error(err);
      response.status(500);
    });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([user]) => {
      if(user[0] == null) {
        response.status(404).send("Not Found : No corresponding id");
      } else {
        console.log(user);
        response.json(user);
      }
    })
    .catch((err) => {
      console.error(err);
      response.status(500);
    });
}

const postUser = (request, response) => {
  const { firstname, lastname, email, city, language } = request.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      response.status(201).send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      response.status(500);
    })
}

module.exports = {
  getUsers,
  getUserById,
  postUser,
}