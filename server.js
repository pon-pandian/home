const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 8081;

app.use(bodyParser.json());

const MONGO_URI = "mongodb://localhost:27017";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userSchema);

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ total: users.length, results: users });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({ id: parseInt(req.params.id) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const latestUser = await User.findOne().sort({ id: -1 });
    const newId = latestUser ? latestUser.id + 1 : 1;

    const newUser = new User({
      id: newId,
      ...req.body,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Error adding user", error: err.message });
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      id: parseInt(req.params.id),
    });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(deletedUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
});

app.use((req, res, next) => {
    res.status(404).json({ status: 404 , message: 'Not Found' })
    next();
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({  status: 500 , message: 'Internal Server Error' })
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// const express = require('express');
// const bodyParser = require("body-parser");
// const app = express();
// const users = require('./routes/users');
// const port = 8080;

// app.use(bodyParser.json())
// app.use("/users", users);
// app.use((req, res, next) => {
//     res.status(404).json({ status: 404 , message: 'Not Found' })
//     next();
// })

// app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(500).json({  status: 500 , message: 'Internal Server Error' })
// });

// app.listen(port, () => console.log(`Server runs on the port number : ${port}`));