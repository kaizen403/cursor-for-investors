import { createCrudRouter } from "../lib/crud.js";

export default createCrudRouter({
  table: "theses",
  entityName: "Thesis",
  requiredFields: ["name"],
  filterableFields: ["fundId", "active"],
  jsonFields: [
    "sectors",
    "stages",
    "geographies",
    "preferredFounderPatterns",
    "antiPatterns",
    "diligenceQuestions",
  ],
  defaults: {
    sectors: [],
    stages: [],
    geographies: [],
    preferredFounderPatterns: [],
    antiPatterns: [],
    diligenceQuestions: [],
    active: true,
  },
  afterRead: (record) => ({
    ...record,
    active: Boolean(record.active),
  }),
  onBeforeSave: (record) => ({
    ...record,
    active: record.active === undefined ? undefined : Number(Boolean(record.active)),
  }),
});
