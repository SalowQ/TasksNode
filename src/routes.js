import { randomUUID } from "node:crypto";

const tasks = [];

export const routes = [
  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) => {
      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: "/tasks",
    handler: (req, res) => {
      const { title, description, completed_at, created_at, updated_at } =
        req.body;

      const task = {
        id: randomUUID(),
        title: title,
        description: description,
        completed_at: completed_at,
        created_at: created_at,
        updated_at: updated_at,
      };

      tasks.push(task);

      return res.writeHead(201).end();
    },
  },
];
