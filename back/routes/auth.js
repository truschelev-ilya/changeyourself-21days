const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { registrationEmail } = require("./middlewares/mailer");

router.post("/registration", async (req, res) => {
  const { login, password, email } = req.body;
  const user = await User.findOne({ login });

  if (user) {
    res.json({ error: true });
  } else {
    const newUser = await User.create({ login, password, email });
    const { id } = newUser;
    res.json({ login, id });
    registrationEmail().catch(console.error);
  }
});

router.post("/login", async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login, password });
  if (user) {
    const { login, id } = user;
    res.json({ login, id });
  } else {
    res.json({ error: true });
  }
});

module.exports = router;
