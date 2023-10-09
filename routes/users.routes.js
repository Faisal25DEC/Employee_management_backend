const express = require("express");
const ip = require("ip");
const UserModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../middleware/authenticate");

//variables
const saltRounds = 10;

const usersRouter = express.Router();

const getIPAdress = (req, res, next) => {
  next();
};

usersRouter.get("/", authenticate, (req, res) => {
  res.send({});
});

usersRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const IP = ip.address();
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      await UserModel.create({ name, email, password: hash, IP });
    });

    res.send(`user create with ip ${IP}`);
  } catch (err) {
    console.log("error creating user");
    res.status(400).send("bad request");
  }
});

usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(400).send("user do not exist");
  } else {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ userId: user._id }, "secretkey");
        res.send({ loggedIn: true, message: "login successful", token });
      } else {
        res.status(400).send("invalid credentials");
      }
    });
  }
});

module.exports = usersRouter;
