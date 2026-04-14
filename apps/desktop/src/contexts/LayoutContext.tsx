import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type NavSection = "pipeline" | "deals" | "theses" | "people" | "meetings";
export type TabKind = "pipeline" | "deal" | "thesis" | "meeting" | "company" | "person";

export interface WorkspaceTab {
  id: string;
  title: string;
  kind: TabKind;
  section: NavSection;
  payload?: Record<string, string | undefined>;
}

type LayoutContextValue = {
  activeSection: NavSection;
  tabs: WorkspaceTab[];
  activeTabId: string;
  sidebarCollapsed: boolean;
  commandOpen: boolean;
  setActiveSection: (section: NavSection) => void;
  openTab: (tab: WorkspaceTab) => void;
  closeTab: (tabId: string) => void;
  selectTab: (tabId: string) => void;
  toggleSidebar: () => void;
  setCommandOpen: (open: boolean) => void;
};

const STORAGE_KEY = "neuralyn.layout.v1";
const defaultPipelineTab: WorkspaceTab = {
  id: "pipeline",
  title: "Pipeline",
  kind: "pipeline",
  section: "pipeline",
};

const LayoutContext = createContext<LayoutContextValue | null>(null);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [tabs, setTabs] = useState<WorkspaceTab[]>(() => {
    if (typeof window === "undefined") {
      return [defaultPipelineTab];
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [defaultPipelineTab];
    }

    try {
      const parsed = JSON.parse(raw) as { tabs?: WorkspaceTab[] };
      return parsed.tabs && parsed.tabs.length > 0 ? parsed.tabs : [defaultPipelineTab];
    } catch {
      return [defaultPipelineTab];
    }
  });
  const [activeTabId, setActiveTabId] = useState<string>(() => tabs[0]?.id ?? defaultPipelineTab.id);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return false;
    }

    try {
      return Boolean((JSON.parse(raw) as { sidebarCollapsed?: boolean }).sidebarCollapsed);
    } catch {
      return false;
    }
  });
  const [commandOpen, setCommandOpen] = useState(false);

  const activeSection = useMemo(() => {
    return tabs.find((tab) => tab.id === activeTabId)?.section ?? "pipeline";
  }, [activeTabId, tabs]);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        tabs,
        sidebarCollapsed,
      }),
    );
  }, [sidebarCollapsed, tabs]);

  const value = useMemo<LayoutContextValue>(
    () => ({
      activeSection,
      tabs,
      activeTabId,
      sidebarCollapsed,
      commandOpen,
      setActiveSection: (section) => {
        setActiveTabId((current) => tabs.find((tab) => tab.id === current)?.id ?? defaultPipelineTab.id);
        if (section === "pipeline") {
          setTabs((current) => {
            const existing = current.find((tab) => tab.id === "pipeline");
            return existing ? current : [defaultPipelineTab, ...current];
          });
          setActiveTabId("pipeline");
        }
      },
      openTab: (tab) => {
        setTabs((current) => {
          if (current.some((existing) => existing.id === tab.id)) {
            return current;
          }

          return [...current, tab];
        });
        setActiveTabId(tab.id);
      },
      closeTab: (tabId) => {
        setTabs((current) => {
          const next = current.filter((tab) => tab.id !== tabId);
          if (next.length === 0) {
            setActiveTabId(defaultPipelineTab.id);
            return [defaultPipelineTab];
          }

          if (activeTabId === tabId) {
            setActiveTabId(next[next.length - 1].id);
          }

          return next;
        });
      },
      selectTab: (tabId) => setActiveTabId(tabId),
      toggleSidebar: () => setSidebarCollapsed((current) => !current),
      setCommandOpen,
    }),
    [activeSection, activeTabId, commandOpen, sidebarCollapsed, tabs],
  );

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error("useLayout must be used inside LayoutProvider");
  }

  return context;
}
