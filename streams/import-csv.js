import fs from "fs";
import { parse } from "csv-parse";

const csvPath = new URL("./task-sheet.csv", import.meta.url);

const stream = fs.createReadStream(csvPath);

const csvParse = parse({
  delimiter: ",",
  skipEmptyLines: true,
  fromLine: 2,
});

async function readCSV() {
  const lineResults = stream.pipe(csvParse);

  let tasks = { tasks: [] };

  for await (const line of lineResults) {
    const [title, description] = line;
    const task = { title: title, description: description };
    tasks.tasks.push(task);
  }
  await fetch("http://localhost:3333/tasks/sheet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tasks),
  });
}

readCSV("./streams/task-sheet.csv");
