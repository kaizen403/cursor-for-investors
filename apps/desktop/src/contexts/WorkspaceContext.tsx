import { createContext, useContext, useEffect, useMemo, useState } from "react";

type RecentItem = {
  id: string;
  title: string;
  kind: "deal" | "company" | "person" | "meeting" | "thesis";
};

type WorkspaceContextValue = {
  activeFund: string;
  recentItems: RecentItem[];
  addRecentItem: (item: RecentItem) => void;
  setActiveFund: (fundName: string) => void;
};

const STORAGE_KEY = "neuralyn.workspace.v1";
const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [activeFund, setActiveFundState] = useState<string>(() => {
    if (typeof window === "undefined") {
      return "Neuralyn Fund I";
    }

    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}").activeFund ?? "Neuralyn Fund I";
    } catch {
      return "Neuralyn Fund I";
    }
  });

  const [recentItems, setRecentItems] = useState<RecentItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}").recentItems ?? [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        activeFund,
        recentItems,
      }),
    );
  }, [activeFund, recentItems]);

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      activeFund,
      recentItems,
      addRecentItem: (item) => {
        setRecentItems((current) => [item, ...current.filter((entry) => entry.id !== item.id)].slice(0, 10));
      },
      setActiveFund: setActiveFundState,
    }),
    [activeFund, recentItems],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error("useWorkspace must be used inside WorkspaceProvider");
  }

  return context;
}
