import { useEffect } from "react";
import {
  BarChart3,
  Briefcase,
  Calendar,
  Clock,
  Lightbulb,
  Plus,
  Users,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem as CmdkItem,
  CommandList,
} from "cmdk";

import {
  useLayout,
  type NavSection,
  type TabKind,
} from "../../contexts/LayoutContext";
import { useWorkspace } from "../../contexts/WorkspaceContext";

type NavEntry = {
  label: string;
  section: NavSection;
  kind: TabKind;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  shortcut?: string;
};

const NAV_ENTRIES: NavEntry[] = [
  {
    label: "Go to Pipeline",
    section: "pipeline",
    kind: "pipeline",
    icon: BarChart3,
    shortcut: "P",
  },
  {
    label: "Go to Deals",
    section: "deals",
    kind: "deal",
    icon: Briefcase,
    shortcut: "D",
  },
  {
    label: "Go to Thesis",
    section: "theses",
    kind: "thesis",
    icon: Lightbulb,
    shortcut: "T",
  },
  { label: "Go to People", section: "people", kind: "person", icon: Users },
  {
    label: "Go to Meetings",
    section: "meetings",
    kind: "meeting",
    icon: Calendar,
  },
];

const ACTION_ENTRIES = [
  { label: "New Deal", value: "new-deal" },
  { label: "New Meeting Note", value: "new-meeting-note" },
  { label: "New Memo", value: "new-memo" },
];

function kindToSection(
  kind: "deal" | "company" | "person" | "meeting" | "thesis",
): NavSection {
  if (kind === "thesis") return "theses";
  if (kind === "person") return "people";
  if (kind === "meeting") return "meetings";
  return "deals";
}

export function CommandPalette() {
  const { commandOpen, openTab, setCommandOpen } = useLayout();
  const { recentItems } = useWorkspace();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setCommandOpen]);

  const navigate = (section: NavSection, kind: TabKind, label: string) => {
    openTab({ id: section, title: label, kind, section });
    setCommandOpen(false);
  };

  return (
    <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
      <CommandInput placeholder="Search actions and navigate…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {NAV_ENTRIES.map((entry) => {
            const Icon = entry.icon;
            return (
              <CmdkItem
                key={entry.section}
                onSelect={() =>
                  navigate(
                    entry.section,
                    entry.kind,
                    entry.label.replace("Go to ", ""),
                  )
                }
                value={entry.label}
              >
                <Icon size={14} style={{ flexShrink: 0, opacity: 0.65 }} />
                <span style={{ flex: 1 }}>{entry.label}</span>
                {entry.shortcut ? (
                  <span
                    style={{
                      fontSize: 10,
                      background: "oklch(1 0 0 / 0.08)",
                      padding: "1px 5px",
                      borderRadius: 3,
                      border: "1px solid var(--border)",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {entry.shortcut}
                  </span>
                ) : null}
              </CmdkItem>
            );
          })}
        </CommandGroup>

        <CommandGroup heading="Actions">
          {ACTION_ENTRIES.map((entry) => (
            <CmdkItem
              key={entry.value}
              onSelect={() => {
                console.log(entry.label);
                setCommandOpen(false);
              }}
              value={entry.label}
            >
              <Plus size={14} style={{ flexShrink: 0, opacity: 0.65 }} />
              <span>{entry.label}</span>
            </CmdkItem>
          ))}
        </CommandGroup>

        {recentItems.length > 0 ? (
          <CommandGroup heading="Recent">
            {recentItems.slice(0, 3).map((item) => (
              <CmdkItem
                key={item.id}
                onSelect={() => {
                  openTab({
                    id: item.id,
                    title: item.title,
                    kind: item.kind,
                    section: kindToSection(item.kind),
                  });
                  setCommandOpen(false);
                }}
                value={item.title}
              >
                <Clock size={14} style={{ flexShrink: 0, opacity: 0.65 }} />
                <span style={{ flex: 1 }}>{item.title}</span>
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--muted-foreground)",
                    flexShrink: 0,
                  }}
                >
                  {item.kind}
                </span>
              </CmdkItem>
            ))}
          </CommandGroup>
        ) : null}
      </CommandList>
    </CommandDialog>
  );
}
