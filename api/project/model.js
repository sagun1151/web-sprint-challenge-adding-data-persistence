// build your `Project` model here
const db = require("../../data/dbConfig");

async function getProjects() {
  const data = await db("projects");
  const newData = data.reduce((acc, step) => {
    if (step.project_completed === 0) {
      return acc.concat({
        project_id: step.project_id,
        project_name: step.project_name,
        project_description: step.project_description,
        project_completed: false,
      });
    } else {
      return acc.concat({
        project_id: step.project_id,
        project_name: step.project_name,
        project_description: step.project_description,
        project_completed: true,
      });
    }
  }, []);
  return newData;
}

async function insert(data) {
  const [project_id] = await db("projects").insert(data);
  const returns = await db("projects").where({ project_id }).first();
  let value = false;
  if (returns.project_completed === 1) {
    value = true;
  }
  const obj = {
    project_id: returns.project_id,
    project_name: returns.project_name,
    project_description: returns.project_description,
    project_completed: value,
  };

  return obj;
}

module.exports = {
  getProjects,
  insert,
};
