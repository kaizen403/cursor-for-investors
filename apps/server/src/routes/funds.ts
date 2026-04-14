import { createCrudRouter } from "../lib/crud.js";

export default createCrudRouter({
  table: "funds",
  entityName: "Fund",
  requiredFields: ["name"],
  createdAt: true,
  updatedAt: false,
  orderBy: "createdAt DESC",
});
