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

      if (tasks.length === 0) {
        return res.writeHead(204).end(JSON.stringify(tasks));
      } else {
        return res.end(JSON.stringify(tasks));
      }
    },
  },
  //post
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;
      const created_at = dataAtual;
      let errors = { errors: [] };

      if (!title || !description) {
        errors.errors.push("Insira todos os campos para criar a tarefa.");
        return res.writeHead(400).end(JSON.stringify(errors));
      }

      const task = {
        id: randomUUID(),
        title: title,
        description: description,
        completed_at: null,
        created_at: created_at,
        updated_at: "",
      };

      database.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },
  //post group
  {
    method: "POST",
    path: buildRoutePath("/tasks/sheet"),
    handler: (req, res) => {
      const { tasks } = req.body;
      const created_at = dataAtual;
      let errors = { errors: [] };

      const hasEmptyString = tasks.some((task) =>
        Object.values(task).some((value) => value === "")
      );

      if (hasEmptyString) {
        errors.errors.push(
          "Os campos de todas as tarefas precisam estar preenchidos."
        );
        return res.writeHead(400).end(JSON.stringify(errors));
      }

      for (const taskFile of tasks) {
        const task = {
          id: randomUUID(),
          title: taskFile.title,
          description: taskFile.description,
          completed_at: null,
          created_at: created_at,
          updated_at: "",
        };
        database.insert("tasks", task);
      }

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
      let errors = { errors: [] };

      const taskById = database.selectById("tasks", id);

      if (!title || !description) {
        errors.errors.push("Insira todos os campos para atualizar a tarefa.");
      }

      if (!taskById) {
        errors.errors.push("ID não encontrado.");
      }

      if (!title || !description || !taskById) {
        return res.writeHead(400).end(JSON.stringify(errors));
      }

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
      let errors = { errors: [] };

      const taskById = database.selectById("tasks", id);

      if (!taskById) {
        errors.errors.push("ID não encontrado.");
        return res.writeHead(400).end(JSON.stringify(errors));
      }

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
      let errors = { errors: [] };

      const taskById = database.selectById("tasks", id);

      if (!taskById) {
        errors.errors.push("ID não encontrado.");
        return res.writeHead(400).end(JSON.stringify(errors));
      }

      database.update("tasks", id, { completed_at });

      return res.writeHead(204).end();
    },
  },
];
