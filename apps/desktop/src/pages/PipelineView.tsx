import { useMemo, useState } from "react";
import type { DealStage, DealWithCompany } from "@vc-ide/shared";

import { usePipeline } from "../hooks/usePipeline";
import { useLayout } from "../contexts/LayoutContext";
import { useWorkspace } from "../contexts/WorkspaceContext";
import { formatRelativeDate, groupDealsByStage, stageOrder } from "../lib/utils";
import { ConfidenceBadge } from "../components/workspace/ConfidenceBadge";
import { StageBadge } from "../components/workspace/StageBadge";
import { StageColumn } from "../components/workspace/StageColumn";

type SortMode = "activity" | "confidence" | "name";

export function PipelineView() {
  const [stageFilter, setStageFilter] = useState<DealStage | "all">("all");
  const [sortBy, setSortBy] = useState<SortMode>("activity");
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const { deals, summary } = usePipeline();
  const { openTab } = useLayout();
  const { addRecentItem } = useWorkspace();

  const filteredDeals = useMemo(() => {
    const source = deals.data ?? [];
    const next = source.filter((deal) => (stageFilter === "all" ? true : deal.stage === stageFilter));

    return next.sort((left, right) => {
      if (sortBy === "confidence") {
        return (right.confidence ?? 0) - (left.confidence ?? 0);
      }

      if (sortBy === "name") {
        return left.company.name.localeCompare(right.company.name);
      }

      return right.lastActivityAt.localeCompare(left.lastActivityAt);
    });
  }, [deals.data, sortBy, stageFilter]);

  const openDeal = (deal: DealWithCompany) => {
    openTab({
      id: `deal:${deal.id}`,
      title: deal.company.name,
      kind: "deal",
      section: "deals",
      payload: { dealId: deal.id },
    });
    addRecentItem({
      id: `deal:${deal.id}`,
      title: deal.company.name,
      kind: "deal",
    });
  };

  const grouped = groupDealsByStage(filteredDeals);
  const totalDeals = Object.values(summary.data ?? {}).reduce((total, count) => total + count, 0);

  return (
    <div className="list-stack">
      <section className="data-card">
        <div className="split-inline">
          <div>
            <div className="muted">Pipeline</div>
            <strong>{totalDeals} active deals</strong>
          </div>
          <div className="action-row">
            <button className="small-action" onClick={() => setViewMode("table")} type="button">
              Table
            </button>
            <button className="small-action" onClick={() => setViewMode("kanban")} type="button">
              Kanban
            </button>
          </div>
        </div>

        <div className="stats-grid" style={{ marginTop: 12 }}>
          {stageOrder.slice(0, 5).map((stage) => (
            <div className="stat-card" key={stage}>
              <div className="muted">{stage.replace("_", " ")}</div>
              <strong>{summary.data?.[stage] ?? 0}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="data-card">
        <div className="toolbar">
          <div className="toolbar-field">
            <label>View</label>
            <select className="select" onChange={(event) => setViewMode(event.target.value as "table" | "kanban")} value={viewMode}>
              <option value="table">Table</option>
              <option value="kanban">Kanban</option>
            </select>
          </div>
          <div className="toolbar-field">
            <label>Stage</label>
            <select className="select" onChange={(event) => setStageFilter(event.target.value as DealStage | "all")} value={stageFilter}>
              <option value="all">All stages</option>
              {stageOrder.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>
          <div className="toolbar-field">
            <label>Sort</label>
            <select className="select" onChange={(event) => setSortBy(event.target.value as SortMode)} value={sortBy}>
              <option value="activity">Last activity</option>
              <option value="confidence">Confidence</option>
              <option value="name">Company name</option>
            </select>
          </div>
        </div>

        {viewMode === "table" ? (
          filteredDeals.length === 0 ? (
            <div className="empty-state">No deals yet. Create your first deal with Ctrl+K.</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Stage</th>
                  <th>Last Touch</th>
                  <th>Confidence</th>
                  <th>Lead Partner</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeals.map((deal) => (
                  <tr key={deal.id} onClick={() => openDeal(deal)} style={{ cursor: "pointer" }}>
                    <td>
                      <strong>{deal.company.name}</strong>
                    </td>
                    <td>
                      <StageBadge stage={deal.stage} />
                    </td>
                    <td>{formatRelativeDate(deal.lastActivityAt)}</td>
                    <td>
                      <ConfidenceBadge value={deal.confidence} />
                    </td>
                    <td>{deal.leadPartner ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          <div className="kanban-grid">
            {stageOrder.map((stage) => (
              <StageColumn deals={grouped[stage]} key={stage} onOpen={openDeal} stage={stage} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
