// build your `Project` model here
const db = require("../../data/dbConfig");

async function getProjects() {
  const data = await db("projects");
  data.forEach((data) => (data.project_completed = !!data.project_completed))
  
  return data;
}

async function insert(data) {
  const [project_id] = await db("projects").insert(data);
  const obj = await db("projects").where({ project_id }).first();
  
  return {
    ...obj,
    project_completed: !! obj.project_completed
  }

}

module.exports = {
  getProjects,
  insert,
};
