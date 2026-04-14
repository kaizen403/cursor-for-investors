import type { ActivityEntry } from "@vc-ide/shared";

import { formatRelativeDate } from "../../lib/utils";

export function DealTimeline({ activity }: { activity: ActivityEntry[] }) {
  if (activity.length === 0) {
    return <div className="empty-state">No timeline events for this deal yet.</div>;
  }

  return (
    <div className="timeline-list">
      {activity.map((entry) => (
        <div className="timeline-item" key={`${entry.entityType}:${entry.entityId}:${entry.timestamp}`}>
          <div className="split-inline">
            <strong>{entry.entityName}</strong>
            <span className="muted">{formatRelativeDate(entry.timestamp)}</span>
          </div>
          <div className="muted">
            {entry.entityType} {entry.action}
          </div>
        </div>
      ))}
    </div>
  );
}
