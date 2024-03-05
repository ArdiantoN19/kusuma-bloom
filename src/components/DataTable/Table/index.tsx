import { promises as fs } from "fs";
import path from "path";

import React from "react";
import { z } from "zod";
import { TaskSchema, columns } from "./Columns";
import { DataTable } from "@/components/DataTable";

const getTasks = async () => {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/components/DataTable/Table/tasks.json")
  );
  const tasks = JSON.parse(data.toString());
  //   return z.array(TaskSchema).parseAsync(tasks);
  return tasks;
};

export default async function TicketTable() {
  const tasks = await getTasks();

  return <DataTable data={tasks} columns={columns} />;
}
