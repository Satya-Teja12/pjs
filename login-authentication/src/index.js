const express = require("express");
const collection = require("./config");
const bcrypt = require("bcryptjs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3000;
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };

  const existingUser = await collection.findOne({ name: data.name });
  if (existingUser) {
    res.send("Try another name");
  } else {
    const saltRounds = 10;
    const hash = await bcrypt.hash(data.password, saltRounds);

    data.password = hash;
    const userdata = await collection.insertMany(data);
    console.log(userdata);
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });
    if (!check) {
      res.send("User name cannot found");
    }
    // Compare the hashed password from the database with the plaintext password
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (!isPasswordMatch) {
      res.send("wrong Password");
    } else {
      res.render("home");
    }
  } catch {
    res.send("wrong Details");
  }
});
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
