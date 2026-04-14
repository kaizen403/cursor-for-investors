import { useEffect, useState } from "react";
import type { Meeting, MeetingType, Person, StructuredMeetingNotes } from "@vc-ide/shared";

type MeetingPayload = {
  attendees: string[];
  date: string;
  dealId?: string | null;
  meetingType: MeetingType;
  rawNotes: string;
  structuredNotes: StructuredMeetingNotes;
};

function splitList(value: string) {
  return value
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function MeetingForm({
  defaultDealId,
  meeting,
  people,
  onSave,
}: {
  defaultDealId?: string;
  meeting?: Meeting;
  people: Person[];
  onSave: (payload: MeetingPayload) => Promise<void> | void;
}) {
  const [form, setForm] = useState<MeetingPayload>({
    attendees: [],
    date: new Date().toISOString().slice(0, 10),
    dealId: defaultDealId,
    meetingType: "founder_call",
    rawNotes: "",
    structuredNotes: {
      metrics: {},
      risks: [],
      asks: [],
      nextSteps: [],
    },
  });

  useEffect(() => {
    if (!meeting) {
      return;
    }

    setForm({
      attendees: meeting.attendees,
      date: meeting.date.slice(0, 10),
      dealId: meeting.dealId,
      meetingType: meeting.meetingType,
      rawNotes: meeting.rawNotes ?? "",
      structuredNotes: meeting.structuredNotes,
    });
  }, [meeting]);

  return (
    <form
      className="form-grid"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSave(form);
      }}
    >
      <div className="meeting-grid">
        <div className="field">
          <label>Date</label>
          <input
            className="input"
            onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
            type="date"
            value={form.date}
          />
        </div>
        <div className="field">
          <label>Meeting Type</label>
          <select
            className="select"
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                meetingType: event.target.value as MeetingType,
              }))
            }
            value={form.meetingType}
          >
            <option value="founder_call">Founder Call</option>
            <option value="partner_meeting">Partner Meeting</option>
            <option value="reference">Reference</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label>Attendees</label>
        <div className="action-row">
          {people.map((person) => {
            const selected = form.attendees.includes(person.id);
            return (
              <button
                className={`small-action ${selected ? "active" : ""}`}
                key={person.id}
                onClick={(event) => {
                  event.preventDefault();
                  setForm((current) => ({
                    ...current,
                    attendees: selected
                      ? current.attendees.filter((entry) => entry !== person.id)
                      : [...current.attendees, person.id],
                  }));
                }}
                type="button"
              >
                {person.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="field">
        <label>Raw Notes</label>
        <textarea
          className="textarea"
          onChange={(event) => setForm((current) => ({ ...current, rawNotes: event.target.value }))}
          value={form.rawNotes}
        />
      </div>
      <div className="meeting-grid">
        <div className="field">
          <label>Metrics (one per line: key:value)</label>
          <textarea
            className="textarea"
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                structuredNotes: {
                  ...current.structuredNotes,
                  metrics: Object.fromEntries(
                    splitList(event.target.value).map((line) => {
                      const [key, ...rest] = line.split(":");
                      return [key.trim(), rest.join(":").trim()];
                    }),
                  ),
                },
              }))
            }
            value={Object.entries(form.structuredNotes.metrics)
              .map(([key, value]) => `${key}: ${value}`)
              .join("\n")}
          />
        </div>
        <div className="field">
          <label>Risks</label>
          <textarea
            className="textarea"
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                structuredNotes: {
                  ...current.structuredNotes,
                  risks: splitList(event.target.value),
                },
              }))
            }
            value={form.structuredNotes.risks.join("\n")}
          />
        </div>
      </div>
      <div className="meeting-grid">
        <div className="field">
          <label>Asks</label>
          <textarea
            className="textarea"
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                structuredNotes: {
                  ...current.structuredNotes,
                  asks: splitList(event.target.value),
                },
              }))
            }
            value={form.structuredNotes.asks.join("\n")}
          />
        </div>
        <div className="field">
          <label>Next Steps</label>
          <textarea
            className="textarea"
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                structuredNotes: {
                  ...current.structuredNotes,
                  nextSteps: splitList(event.target.value),
                },
              }))
            }
            value={form.structuredNotes.nextSteps.join("\n")}
          />
        </div>
      </div>
      <div className="action-row">
        <button className="primary-action" type="submit">
          Save Meeting
        </button>
      </div>
    </form>
  );
}
