// build your `/api/projects` router here
const express = require("express");
const Projects = require("./model");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const data = await Projects.insert(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const data = await Projects.getProjects();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
