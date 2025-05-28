import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();
const hoje = new Date();
const dia = String(hoje.getDate()).padStart(2, "0");
const mes = String(hoje.getMonth() + 1).padStart(2, "0");
const ano = hoje.getFullYear().toString().slice(2);
const dataAtual = `${dia}/${mes}/${ano}`;

export const routes = [
  //get
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );

      return res.end(JSON.stringify(tasks));
    },
  },
  //post
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;
      const created_at = dataAtual;

      const task = {
        id: randomUUID(),
        title: title,
        description: description,
        completed_at: "",
        created_at: created_at,
        updated_at: "",
      };

      database.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },
  //put
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;
      const updated_at = dataAtual;

      database.update("tasks", id, {
        title,
        description,
        updated_at,
      });

      return res.writeHead(204).end();
    },
  },
  //delete
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
  //patch
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;
      const completed_at = dataAtual;

      database.update("tasks", id, { completed_at });

      return res.writeHead(204).end();
    },
  },
];
