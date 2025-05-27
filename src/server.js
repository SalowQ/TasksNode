import http from "node:http";
import { json } from "./middlewares/json.js";

const server = http.createServer(async (req, res) => {
  await json(req, res);

  console.log("oi");

  return res.writeHead(404).end();
});

server.listen(3333);
