import type { DealFull } from "@vc-ide/shared";

import { ConfidenceBadge } from "./ConfidenceBadge";
import { CompanyCard } from "./CompanyCard";
import { StageBadge } from "./StageBadge";

export function DealOverview({ deal }: { deal: DealFull }) {
  return (
    <div className="detail-grid">
      <CompanyCard company={deal.company} thesis={deal.thesis} />
      <section className="data-card">
        <div className="split-inline">
          <div>
            <div className="muted">Deal</div>
            <strong>{deal.company.name}</strong>
          </div>
          <StageBadge stage={deal.stage} />
        </div>
        <div className="action-row" style={{ marginTop: 12 }}>
          <ConfidenceBadge value={deal.confidence} />
          <span className="badge">Lead {deal.leadPartner ?? "Unassigned"}</span>
          <span className="badge">{deal.source ?? "Unknown source"}</span>
        </div>
        <div className="list-stack" style={{ marginTop: 12 }}>
          {deal.tasks.map((task) => (
            <div className="list-item" key={task.id}>
              <div className="split-inline">
                <strong>{task.title}</strong>
                <span className="badge">{task.status}</span>
              </div>
              <div className="muted">{task.assignee ?? "Unassigned"}</div>
            </div>
          ))}
          {deal.tasks.length === 0 ? <div className="empty-state">No open tasks for this deal.</div> : null}
        </div>
      </section>
    </div>
  );
}
