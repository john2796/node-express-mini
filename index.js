// implement your API here
const express = require("express");
const port = 5000;
const db = require("./data/db");
const cors = require("cors");
const server = express();

// middleware
server.use(express.json());
server.use(cors());

//READ
server.get("/api/users", (req, res) => {
  db.find()
    .then(user => {
      res.status(200).json({ success: true, user });
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        message: "The users information could not be retrieved"
      })
    );
});
//FIND By ID
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json({ success: true, user });
        res.status(404).json({
          success: true,
          message: "The user with the specified ID does not exist."
        });
      } else {
      }
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        message: "The users information could not be retrieved"
      })
    );
});

//POST
server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  //- If the request body is missing the `name` or `bio` property:
  if (!name) {
    res.status(400).json({ message: "Please provide name for the user" });
  }
  if (!bio) {
    res.status(400).json({ message: "Please provide bio for the user" });
  }

  db.insert({ name, bio })
    .then(user => {
      res.status(201).json({ success: true, user });
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        message: "There was an error while saving the user to the database"
      })
    );
});
//DELETE
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(user => {
      if (user) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist"
        });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ success: false, message: "The user could not be removed" })
    );
});
//UPDATE
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  //- If the request body is missing the `name` or `bio` property:
  if (!name) {
    res.status(400).json({ message: "Please provide name for the user." });
  }
  if (!bio) {
    res.status(400).json({ message: "Please provide bio for the user." });
  }
  db.update(id, { name, bio })
    .then(updated => {
      //x If the _user_ with the specified `id` is not found:
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist. "
        });
      }
    }) //If there's an error when updating the _user_:
    .catch(err =>
      res.status(500).json({
        success: false,
        message: "The user information could not be modified"
      })
    );
});

server.listen(port, () => {
  console.log(`port running on ${port}`);
});
