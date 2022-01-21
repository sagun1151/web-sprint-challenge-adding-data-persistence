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
    data.forEach((data) => (data.task_completed
    = !!data.task_completed))

  return data;
}

async function insert(data) {
  const [task_id] = await db("tasks").insert(data);
  const obj = await db("tasks as t")
    .leftJoin("projects as p", "t.project_id", "p.project_id")
    .where("task_id", task_id)
    .select(
      "task_id",
      "task_description",
      "task_notes",
      "task_completed",
      "t.project_id"
    )
    .first();
  
  return {
    ...obj,
    task_completed: !! obj.task_completed
  }
}
//   let value = false;
//   if (returns.task_completed === 1) {
//     value = true;
//   }
//   const obj = {
//     task_id: returns.task_id,
//     task_description: returns.task_description,
//     task_notes: returns.task_notes,
//     task_completed: value,
//     project_id: returns.project_id,
//   };

//   return obj;
// }

module.exports = {
  getTasks,
  insert,
};
