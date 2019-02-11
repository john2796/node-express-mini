// implement your API here
const express = require("express");
const port = 5000;
const db = require("./data/db");
const server = express();

// middleware
server.use(express.json());

server.get("/api/users", (req, res) => {
  db.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(400).json({ success: false, message: err }));
});

server.listen(port, () => {
  console.log(`port running on ${port}`);
});
