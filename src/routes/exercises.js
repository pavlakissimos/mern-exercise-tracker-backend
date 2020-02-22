const router = require("express").Router();
const Exercise = require("../models/exercise.model");

router.route("/").get(async (_req, res) => {
  try {
    const exercise = await Exercise.find().populate("user");

    res.json(exercise);
    return exercise;
  } catch (err) {
    res.status(400);
    res.json(`Error: ${err}`);
  }
});

router.route("/add").post(async (req, res) => {
  try {
    const { user, description } = req.body;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const newExercise = new Exercise({ description, duration, date, user });
    const savedExercise = await newExercise.save();

    res.json(savedExercise);
    return savedExercise;
  } catch (err) {
    res.status(400);
    res.json(`Error: ${err}`);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id).populate("user");

    res.json(exercise);
    return exercise;
  } catch (err) {
    res.status(400);
    res.json(`Error: ${err}`);
  }
});

router.route("/update/:id").put(async (req, res) => {
  try {
    const { username, description } = req.body;
    const duration = Number(req.body.duration);
    const date = req.body.date ? Date.parse(req.body.date) : null;
    const exercise = await Exercise.findById(req.params.id);
    exercise.username = username ? username : exercise.username;
    exercise.description = description ? description : exercise.description;
    exercise.duration = duration ? duration : exercise.duration;
    exercise.date = date ? date : exercise.date;
    const savedExercise = await exercise.save();

    res.json(savedExercise);
    return savedExercise;
  } catch (err) {
    res.status(400);
    res.json(`Error: ${err}`);
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  try {
    const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);

    res.json(deletedExercise);
    return deletedExercise;
  } catch (error) {
    res.status(400);
    res.json(`Error: ${err}`);
  }
});

module.exports = router;
