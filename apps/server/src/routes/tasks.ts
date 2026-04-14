import { createCrudRouter } from "../lib/crud.js";

export default createCrudRouter({
  table: "tasks",
  entityName: "Task",
  requiredFields: ["title", "status"],
  filterableFields: ["dealId", "status", "assignee"],
  createdAt: true,
  updatedAt: false,
  onBeforeSave: (record) => {
    if (record.status === "done" && !record.completedAt) {
      record.completedAt = new Date().toISOString();
    }

    if (record.status !== "done") {
      record.completedAt = null;
    }

    return record;
  },
  orderBy: "CASE status WHEN 'open' THEN 0 ELSE 1 END, dueDate ASC",
});
