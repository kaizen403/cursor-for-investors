import { useEffect, useMemo, useState } from "react";

import { DealNotes } from "../components/workspace/DealNotes";
import { DealOverview } from "../components/workspace/DealOverview";
import { DealTimeline } from "../components/workspace/DealTimeline";
import { ConfidenceBadge } from "../components/workspace/ConfidenceBadge";
import { StageBadge } from "../components/workspace/StageBadge";
import { useDealFull } from "../hooks/useDeals";
import { useWorkspace } from "../contexts/WorkspaceContext";

const tabs = ["overview", "notes", "memos", "timeline"] as const;

export function DealWorkspace({
  dealId,
  initialSection = "overview",
}: {
  dealId?: string;
  initialSection?: (typeof tabs)[number];
}) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>(initialSection);
  const dealQuery = useDealFull(dealId);
  const { addRecentItem } = useWorkspace();

  useEffect(() => {
    if (!dealQuery.data) {
      return;
    }

    addRecentItem({
      id: `deal:${dealQuery.data.id}`,
      title: dealQuery.data.company.name,
      kind: "deal",
    });
  }, [addRecentItem, dealQuery.data]);

  const memoContent = useMemo(() => dealQuery.data?.memos ?? [], [dealQuery.data]);

  if (!dealId) {
    return <div className="empty-state">Select a deal from the pipeline or search to open a workspace.</div>;
  }

  if (dealQuery.isLoading) {
    return <div className="empty-state">Loading deal workspace…</div>;
  }

  if (!dealQuery.data) {
    return <div className="empty-state">Deal not found.</div>;
  }

  const deal = dealQuery.data;

  return (
    <div className="list-stack">
      <section className="data-card">
        <div className="split-inline">
          <div>
            <div className="muted">Deal Workspace</div>
            <strong>{deal.company.name}</strong>
          </div>
          <div className="action-row">
            <StageBadge stage={deal.stage} />
            <ConfidenceBadge value={deal.confidence} />
          </div>
        </div>
        <div className="action-row" style={{ marginTop: 12 }}>
          {tabs.map((tab) => (
            <button
              className={`small-action ${activeTab === tab ? "active" : ""}`}
              key={tab}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {activeTab === "overview" ? <DealOverview deal={deal} /> : null}
      {activeTab === "notes" ? <DealNotes meetings={deal.meetings} /> : null}
      {activeTab === "memos" ? (
        memoContent.length === 0 ? (
          <div className="empty-state">No memos have been drafted for this deal.</div>
        ) : (
          <div className="list-stack">
            {memoContent.map((memo) => (
              <article className="list-item" key={memo.id}>
                <div className="split-inline">
                  <strong>{memo.title}</strong>
                  <span className="badge">{memo.status}</span>
                </div>
                <p>{memo.content ?? "No memo body recorded."}</p>
              </article>
            ))}
          </div>
        )
      ) : null}
      {activeTab === "timeline" ? <DealTimeline activity={deal.activity} /> : null}
    </div>
  );
}
