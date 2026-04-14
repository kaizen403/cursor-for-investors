import { createCrudRouter } from "../lib/crud.js";

export default createCrudRouter({
  table: "people",
  entityName: "Person",
  requiredFields: ["name"],
  filterableFields: ["companyId", "role"],
  jsonFields: ["tags"],
  defaults: {
    tags: [],
  },
  orderBy: "relationshipScore DESC",
});
