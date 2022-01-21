// build your `/api/tasks` router here
const express = require("express");
const Tasks = require("./model");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const data = await Tasks.insert(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const data = await Tasks.getTasks();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
