import { useWorkspace } from "../../contexts/WorkspaceContext";

export function StatusBar() {
  const { activeFund } = useWorkspace();

  return (
    <footer className="status-bar liquid-glass">
      <div className="status-cluster">
        <span className="muted">Workspace:</span>
        <strong>{activeFund}</strong>
      </div>
      <div className="status-cluster">
        <span>12 deals</span>
      </div>
      <div className="status-cluster">
        <span>3 tasks due</span>
      </div>
    </footer>
  );
}
