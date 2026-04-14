import { createCrudRouter } from "../lib/crud.js";

export default createCrudRouter({
  table: "companies",
  entityName: "Company",
  requiredFields: ["name"],
  filterableFields: ["sector", "stage"],
  orderBy: "updatedAt DESC",
});
