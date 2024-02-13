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

const createUser = (request, response) => {
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

const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { firstname, lastname, email, city, language } =  request.body;

  database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      if(result.affectedRows === 0) {
        response.status(404);
      } else {
        response.status(204);
      }
    })
    .catch((err) => {
      console.error(err);
      response.status(500);
    });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
}