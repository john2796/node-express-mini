// implement your API here
const express = require("express");
const port = 5000;
const db = require("./data/db");
const server = express();

// middleware
server.use(express.json());
//READ
server.get("/api/users", (req, res) => {
  db.find()
    .then(user => {
      res.status(200).json({ success: true, user });
    })
    .catch(err => res.status(400).json({ success: false, message: err }));
});
//POST
server.post("/api/users", (req, res) => {
  const user = req.body;
  db.insert(user)
    .then(user => {
      res.status(200).json({ success: true, user });
    })
    .catch(err => res.status(400).json({ success: false, message: err }));
});
//DELETE
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(user => {
      res.status(200).json({ success: true });
    })
    .catch(err => res.status(400).json({ success: false, message: err }));
});
//DELETE
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = req.body;
  db.update(id, user)
    .then(updated => {
      //check if id is there
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res
          .status(404)
          .json({
            success: false,
            message: "I cannot find the hub you're looking for "
          });
      }
    })
    .catch(err => res.status(400).json({ success: false, message: err }));
});

server.listen(port, () => {
  console.log(`port running on ${port}`);
});
