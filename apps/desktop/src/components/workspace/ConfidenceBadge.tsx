import { confidenceLabel } from "../../lib/utils";

export function ConfidenceBadge({ value }: { value?: number | null }) {
  const label = confidenceLabel(value);
  return <span className="badge">{value ?? "—"} · {label}</span>;
}
