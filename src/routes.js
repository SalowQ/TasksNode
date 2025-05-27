import { randomUUID } from "node:crypto";
import { Database } from "./database.js";

const database = new Database();

export const routes = [
  //get
  {
    method: "GET",
    path: "/tasks",
    handler: (req, res) => {
      const tasks = database.select("tasks", null);

      return res.end(JSON.stringify(tasks));
    },
  },
  //post
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

      database.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },
];
