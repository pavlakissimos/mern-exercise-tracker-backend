const router = require("express").Router();
const User = require("../models/user.model");

router.route("/").get(async (_req, res) => {
  try {
    const users = await User.find();

    res.json(users);
    return users;
  } catch (err) {
    res.status(400);
    res.json(`Error: ${err}`);
  }
});

router.route("/add").post(async (req, res) => {
  const { username } = req.body;

  try {
    const newUser = new User({ username });
    const savedUser = await newUser.save();

    res.json(savedUser);
    return savedUser;
  } catch (err) {
    res.status(400);
    res.json(`Error: ${err}`);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.json(user);
    return user;
  } catch (err) {
    res.status(400);
    res.json(`Error: ${err}`);
  }
});

router.route("/update/:id").put(async (req, res) => {
  const { username } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    user.username = username;
    const savedUser = await user.save();

    res.json(savedUser);
    return savedUser;
  } catch (err) {
    res.status(400);
    res.json(`Error: ${err}`);
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    res.json(deletedUser);
    return deletedUser;
  } catch (err) {
    res.status(400);
    res.json(`Error: ${err}`);
  }
});

module.exports = router;
