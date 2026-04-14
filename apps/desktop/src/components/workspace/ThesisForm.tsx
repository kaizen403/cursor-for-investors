import { useEffect, useState } from "react";
import type { Thesis, UpdateThesisInput } from "@vc-ide/shared";

function splitValues(value: string) {
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

export function ThesisForm({
  onSave,
  thesis,
}: {
  onSave: (payload: UpdateThesisInput) => Promise<void> | void;
  thesis?: Thesis;
}) {
  const [form, setForm] = useState<UpdateThesisInput>({
    name: "",
    sectors: [],
    stages: [],
    geographies: [],
    ownershipTargetMin: 0.05,
    ownershipTargetMax: 0.15,
    preferredFounderPatterns: [],
    antiPatterns: [],
    diligenceQuestions: [],
    active: true,
  });

  useEffect(() => {
    if (!thesis) {
      return;
    }

    setForm({
      name: thesis.name,
      sectors: thesis.sectors,
      stages: thesis.stages,
      geographies: thesis.geographies,
      ownershipTargetMin: thesis.ownershipTargetMin ?? undefined,
      ownershipTargetMax: thesis.ownershipTargetMax ?? undefined,
      preferredFounderPatterns: thesis.preferredFounderPatterns,
      antiPatterns: thesis.antiPatterns,
      diligenceQuestions: thesis.diligenceQuestions,
      active: thesis.active,
    });
  }, [thesis]);

  return (
    <form
      className="form-grid"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSave(form);
      }}
    >
      <div className="field">
        <label>Name</label>
        <input
          className="input"
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          value={form.name ?? ""}
        />
      </div>
      <div className="meeting-grid">
        <div className="field">
          <label>Sectors</label>
          <input
            className="input"
            onChange={(event) => setForm((current) => ({ ...current, sectors: splitValues(event.target.value) }))}
            value={(form.sectors ?? []).join(", ")}
          />
        </div>
        <div className="field">
          <label>Geographies</label>
          <input
            className="input"
            onChange={(event) => setForm((current) => ({ ...current, geographies: splitValues(event.target.value) }))}
            value={(form.geographies ?? []).join(", ")}
          />
        </div>
      </div>
      <div className="field">
        <label>Stages</label>
        <input
          className="input"
          onChange={(event) => setForm((current) => ({ ...current, stages: splitValues(event.target.value) }))}
          value={(form.stages ?? []).join(", ")}
        />
      </div>
      <div className="meeting-grid">
        <div className="field">
          <label>Ownership Target Min</label>
          <input
            className="input"
            min="0"
            onChange={(event) =>
              setForm((current) => ({ ...current, ownershipTargetMin: Number(event.target.value) }))
            }
            step="0.01"
            type="number"
            value={form.ownershipTargetMin ?? 0}
          />
        </div>
        <div className="field">
          <label>Ownership Target Max</label>
          <input
            className="input"
            min="0"
            onChange={(event) =>
              setForm((current) => ({ ...current, ownershipTargetMax: Number(event.target.value) }))
            }
            step="0.01"
            type="number"
            value={form.ownershipTargetMax ?? 0}
          />
        </div>
      </div>
      <div className="field">
        <label>Preferred Founder Patterns</label>
        <textarea
          className="textarea"
          onChange={(event) =>
            setForm((current) => ({ ...current, preferredFounderPatterns: splitValues(event.target.value) }))
          }
          value={(form.preferredFounderPatterns ?? []).join(", ")}
        />
      </div>
      <div className="field">
        <label>Anti-patterns</label>
        <textarea
          className="textarea"
          onChange={(event) =>
            setForm((current) => ({ ...current, antiPatterns: splitValues(event.target.value) }))
          }
          value={(form.antiPatterns ?? []).join(", ")}
        />
      </div>
      <div className="field">
        <label>Diligence Questions</label>
        <textarea
          className="textarea"
          onChange={(event) =>
            setForm((current) => ({ ...current, diligenceQuestions: splitValues(event.target.value) }))
          }
          value={(form.diligenceQuestions ?? []).join(", ")}
        />
      </div>
      <div className="action-row">
        <button className="primary-action" type="submit">
          Save Thesis
        </button>
      </div>
    </form>
  );
}
