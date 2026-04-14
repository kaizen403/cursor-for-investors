import type { Meeting } from "@vc-ide/shared";

import { formatRelativeDate } from "../../lib/utils";

export function DealNotes({ meetings }: { meetings: Meeting[] }) {
  if (meetings.length === 0) {
    return <div className="empty-state">No meeting notes. Record your first founder call.</div>;
  }

  return (
    <div className="list-stack">
      {meetings.map((meeting) => (
        <article className="list-item" key={meeting.id}>
          <div className="split-inline">
            <strong>{meeting.meetingType}</strong>
            <span className="muted">{formatRelativeDate(meeting.date)}</span>
          </div>
          <p>{meeting.rawNotes ?? "No raw notes captured."}</p>
          <div className="action-row">
            {meeting.structuredNotes.risks.map((risk) => (
              <span className="badge" key={risk}>
                Risk: {risk}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
