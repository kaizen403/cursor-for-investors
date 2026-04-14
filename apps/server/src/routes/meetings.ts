import { createCrudRouter } from "../lib/crud.js";

export default createCrudRouter({
  table: "meetings",
  entityName: "Meeting",
  requiredFields: ["date", "meetingType"],
  filterableFields: ["dealId", "meetingType"],
  jsonFields: ["attendees", "structuredNotes"],
  defaults: {
    attendees: [],
    structuredNotes: {
      metrics: {},
      risks: [],
      asks: [],
      nextSteps: [],
    },
  },
  updatedAt: false,
  orderBy: "date DESC",
});
