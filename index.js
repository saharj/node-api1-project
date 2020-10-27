const express = require("express");
const shortid = require("shortid");
const generate = shortid.generate;

let users = [
  {
    id: generate(),
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane",
  },
];

const app = express();

app.use(express.json());

app.get("/api/users", (req, res) => {
  try {
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

app.post("/api/users", (req, res) => {
  console.log(req.body);
  const { name, bio } = req.body;

  try {
    if (!name || !bio) {
      res
        .status(404)
        .json({ message: "Please provide name and bio for the user." });
    } else {
      const newUser = { id: generate(), name, bio };
      users.push(newUser);
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({
      message: "The user information could not be retrieved.",
    });
  }
});

app.get("/api/users/:id", (req, res) => {
  const id = req.params;

  const user = users.find((user) => user.id === id);

  try {
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: "The user information could not be retrieved.",
    });
  }
});

app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  try {
    if (!users.find((user) => user.id === id)) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    } else {
      users = users.filter((user) => user.id !== id);
      res.status(200).json({ message: "User is deleted." });
    }
  } catch (err) {
    res.status(500).json({
      message: "The user could not be removed",
    });
  }
});

app.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const { name, bio } = req.body;

  let userIndex = users.findIndex((user) => user.id === id);

  if (!id) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (userIndex === -1) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user." });
  } else {
    users[userIndex] = { id, name, bio };

    res
      .status(200)
      .json({ message: "The user information could not be modified." });
  }
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Not found!" });
});

app.listen(5000, () => console.log("API running on port 5000"));
