const express = require("express");
const router = express.Router();
const db = require("./auth-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/register", async (req, res, next) => {
  try {
    const incoming = {
      username: req.body.username,
      password: req.body.password
    };
    const newUser = await db.createUser(incoming);
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const incoming = {
      username: req.body.username,
      password: req.body.password
    };
    const user = await db.findByName(incoming.username);
    const pass = await bcrypt.compareSync(incoming.password, user.password);
    if (!user || !pass) {
      return res
        .status(401)
        .json({ message: "Either the name or password is wrong." });
    }

    const payload = {
      subject: user.id,
      name: user.username
    };
    const token = jwt.sign(payload, process.env.SECRET);
    res
      .status(200)
      .cookie("token", token)
      .json({ message: `welcome ${user.username}`, token: token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
