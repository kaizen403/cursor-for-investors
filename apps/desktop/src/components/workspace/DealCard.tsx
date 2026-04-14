import type { DealWithCompany } from "@vc-ide/shared";

import { ConfidenceBadge } from "./ConfidenceBadge";
import { StageBadge } from "./StageBadge";
import { formatRelativeDate } from "../../lib/utils";

export function DealCard({
  deal,
  onOpen,
}: {
  deal: DealWithCompany;
  onOpen: (deal: DealWithCompany) => void;
}) {
  return (
    <button className="data-card" onClick={() => onOpen(deal)} type="button">
      <div className="split-inline">
        <strong>{deal.company.name}</strong>
        <StageBadge stage={deal.stage} />
      </div>
      <p className="muted">{deal.company.sector ?? "No sector tagged"}</p>
      <div className="action-row">
        <ConfidenceBadge value={deal.confidence} />
        <span className="badge">{formatRelativeDate(deal.lastActivityAt)}</span>
      </div>
    </button>
  );
}
