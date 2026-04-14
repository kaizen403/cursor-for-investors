import { db } from "./index.js";
import { schemaStatements } from "./schema.js";

export function migrate() {
  for (const statement of schemaStatements) {
    db.exec(statement);
  }
}
