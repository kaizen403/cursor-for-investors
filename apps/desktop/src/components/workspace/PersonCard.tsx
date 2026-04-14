import type { Person } from "@vc-ide/shared";

import { formatRelativeDate } from "../../lib/utils";

export function PersonCard({ person }: { person: Person }) {
  return (
    <section className="data-card">
      <div className="split-inline">
        <div>
          <div className="muted">Person</div>
          <strong>{person.name}</strong>
        </div>
        <span className="badge">{person.relationshipScore ?? "—"}</span>
      </div>
      <p className="muted">{person.role ?? "No role captured"}</p>
      <div className="action-row">
        {person.tags.map((tag) => (
          <span className="badge" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <div className="muted" style={{ marginTop: 12 }}>
        Last contact {formatRelativeDate(person.lastContactAt)}
      </div>
    </section>
  );
}
