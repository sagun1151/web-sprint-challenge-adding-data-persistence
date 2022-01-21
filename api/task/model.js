// build your `Task` model here
const db = require("../../data/dbConfig");

async function getTasks() {
  const data = await db("tasks as t")
    .leftJoin("projects as p", "t.project_id", "p.project_id")
    .select(
      "task_id",
      "task_description",
      "task_notes",
      "task_completed",
      "project_name",
      "project_description"
    );

  const newData = data.reduce((acc, step) => {
    if (step.task_completed === 0) {
      return acc.concat({
        task_id: step.task_id,
        task_description: step.task_description,
        task_notes: step.task_notes,
        task_completed: false,
        project_name: step.project_name,
        project_description: step.project_description,
      });
    } else {
      return acc.concat({
        task_id: step.task_id,
        task_description: step.task_description,
        task_notes: step.task_notes,
        task_completed: true,
        project_name: step.project_name,
        project_description: step.project_description,
      });
    }
  }, []);

  return newData;
}

async function insert(data) {
  const [task_id] = await db("tasks").insert(data);
  const returns = await db("tasks as t")
  .leftJoin("projects as p", "t.project_id", "p.project_id")
  .where('task_id', task_id)
  .select(
    "task_id",
    "task_description",
    "task_notes",
    "task_completed",
    "t.project_id",
  ).first();
  let value = false;
  if (returns.task_completed === 1) {
    value = true;
  }
  const obj = {
    task_id: returns.task_id,
    task_description: returns.task_description,
    task_notes: returns.task_notes,
    task_completed: value,
    project_id: returns.project_id
  };

  return obj;
}

module.exports = {
  getTasks,
  insert,
};
