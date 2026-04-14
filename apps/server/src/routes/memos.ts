import { createCrudRouter } from "../lib/crud.js";

export default createCrudRouter({
  table: "memos",
  entityName: "Memo",
  requiredFields: ["title", "memoType", "status"],
  filterableFields: ["dealId", "memoType", "status"],
  orderBy: "updatedAt DESC",
});
