import { X } from "lucide-react";

import { useLayout } from "../../contexts/LayoutContext";

function PlaceholderContent({ title }: { title: string }) {
  return (
    <div className="empty-state" style={{ flexDirection: "column", gap: 8 }}>
      <div
        style={{ fontSize: 14, fontWeight: 500, color: "var(--foreground)" }}
      >
        {title}
      </div>
      <div style={{ fontSize: 12, maxWidth: 280, textAlign: "center" }}>
        This view will be available in Phase 4
      </div>
    </div>
  );
}

export function TabArea() {
  const { activeTabId, closeTab, selectTab, tabs } = useLayout();
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

  if (tabs.length === 0) {
    return (
      <section className="content-card">
        <div
          className="empty-state"
          style={{ flexDirection: "column", gap: 8 }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "var(--foreground)",
            }}
          >
            Neuralyn — Investor IDE
          </div>
          <div style={{ fontSize: 12, maxWidth: 320, textAlign: "center" }}>
            Select a section from the sidebar or press{" "}
            <kbd
              style={{
                fontSize: 10,
                background: "oklch(1 0 0 / 0.08)",
                padding: "1px 5px",
                borderRadius: 3,
                border: "1px solid var(--border)",
                fontFamily: "inherit",
              }}
            >
              ⌘K
            </kbd>{" "}
            to search
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="content-card">
      <div className="tab-strip">
        {tabs.map((tab) => (
          <button
            className={`tab-button${tab.id === activeTabId ? " active" : ""}`}
            key={tab.id}
            onClick={() => selectTab(tab.id)}
            type="button"
          >
            <span>{tab.title}</span>
            {tab.id !== "pipeline" ? (
              <button
                aria-label={`Close ${tab.title}`}
                className="tab-close"
                onClick={(event) => {
                  event.stopPropagation();
                  closeTab(tab.id);
                }}
                type="button"
              >
                <X size={11} />
              </button>
            ) : null}
          </button>
        ))}
      </div>
      <div className="tab-body">
        <PlaceholderContent title={activeTab?.title ?? "Pipeline"} />
      </div>
    </section>
  );
}
