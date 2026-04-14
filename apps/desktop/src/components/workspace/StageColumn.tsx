import type { DealStage, DealWithCompany } from "@vc-ide/shared";

import { stageLabel } from "../../lib/utils";
import { DealCard } from "./DealCard";

export function StageColumn({
  deals,
  onOpen,
  stage,
}: {
  deals: DealWithCompany[];
  onOpen: (deal: DealWithCompany) => void;
  stage: DealStage;
}) {
  return (
    <section className="data-card">
      <div className="split-inline">
        <strong>{stageLabel(stage)}</strong>
        <span className="muted">{deals.length}</span>
      </div>
      <div className="list-stack" style={{ marginTop: 12 }}>
        {deals.map((deal) => (
          <DealCard deal={deal} key={deal.id} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}
