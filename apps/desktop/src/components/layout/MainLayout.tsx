import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { useLayout } from "../../contexts/LayoutContext";
import { BottomPanel } from "./BottomPanel";
import { Sidebar } from "./Sidebar";
import { StatusBar } from "./StatusBar";
import { TabArea } from "./TabArea";

export function MainLayout() {
  const { sidebarCollapsed } = useLayout();

  return (
    <div className="app-shell">
      <div className="workspace-grid">
        <PanelGroup autoSaveId="neuralyn.horizontal" direction="horizontal">
          <Panel
            className="layout-panel"
            collapsedSize={4}
            collapsible
            defaultSize={sidebarCollapsed ? 6 : 22}
            maxSize={35}
            minSize={15}
          >
            <Sidebar />
          </Panel>
          <PanelResizeHandle className="resize-handle" />
          <Panel className="layout-panel" minSize={55}>
            <PanelGroup autoSaveId="neuralyn.vertical" direction="vertical">
              <Panel className="layout-panel" defaultSize={74} minSize={50}>
                <div className="shell-content">
                  <TabArea />
                </div>
              </Panel>
              <PanelResizeHandle className="resize-handle" />
              <Panel className="layout-panel" collapsible defaultSize={26} minSize={12}>
                <BottomPanel />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
        <StatusBar />
      </div>
    </div>
  );
}
