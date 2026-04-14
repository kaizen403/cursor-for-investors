import {
  BarChart3,
  Briefcase,
  Calendar,
  Clock,
  Eye,
  Lightbulb,
  Users,
} from "lucide-react";

import {
  useLayout,
  type NavSection,
  type TabKind,
} from "../../contexts/LayoutContext";
import { useWorkspace } from "../../contexts/WorkspaceContext";
import { SidebarSection } from "./SidebarSection";

type NavItem = {
  key: NavSection;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  kind: TabKind;
};

const NAV_ITEMS: NavItem[] = [
  { key: "pipeline", label: "Pipeline", icon: BarChart3, kind: "pipeline" },
  { key: "deals", label: "Deals", icon: Briefcase, kind: "deal" },
  { key: "theses", label: "Thesis", icon: Lightbulb, kind: "thesis" },
  { key: "people", label: "People", icon: Users, kind: "person" },
  { key: "meetings", label: "Meetings", icon: Calendar, kind: "meeting" },
];

const WATCHLISTS = ["AI Infrastructure", "Climate Tech", "Developer Tools"];

export function Sidebar() {
  const { activeSection, openTab, toggleSidebar } = useLayout();
  const { recentItems } = useWorkspace();

  return (
    <aside className="sidebar-card liquid-glass">
      <div className="sidebar-header">
        <div>
          <div
            className="muted"
            style={{
              fontSize: 10,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Investor IDE
          </div>
          <strong style={{ fontSize: 13 }}>Neuralyn</strong>
        </div>
        <button className="small-action" onClick={toggleSidebar} type="button">
          ⇆
        </button>
      </div>

      <div className="sidebar-content">
        <SidebarSection title="Navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={`sidebar-item${activeSection === item.key ? " active" : ""}`}
                key={item.key}
                onClick={() =>
                  openTab({
                    id: item.key,
                    title: item.label,
                    kind: item.kind,
                    section: item.key,
                  })
                }
                type="button"
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </SidebarSection>

        <SidebarSection title="Recent" defaultOpen>
          {recentItems.length === 0 ? (
            <div
              className="sidebar-item"
              style={{ cursor: "default", pointerEvents: "none" }}
            >
              <Clock size={12} />
              <span style={{ fontSize: 11 }}>No recent items</span>
            </div>
          ) : null}
          {recentItems.slice(0, 5).map((item) => (
            <button
              className="sidebar-item"
              key={item.id}
              onClick={() =>
                openTab({
                  id: item.id,
                  title: item.title,
                  kind: item.kind,
                  section:
                    item.kind === "thesis"
                      ? "theses"
                      : item.kind === "person"
                        ? "people"
                        : item.kind === "meeting"
                          ? "meetings"
                          : "deals",
                })
              }
              type="button"
            >
              <Clock size={12} />
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.title}
              </span>
            </button>
          ))}
        </SidebarSection>

        <SidebarSection title="Watchlists" defaultOpen>
          {WATCHLISTS.map((name) => (
            <button className="sidebar-item" key={name} type="button">
              <Eye size={12} />
              <span>{name}</span>
            </button>
          ))}
        </SidebarSection>
      </div>
    </aside>
  );
}
