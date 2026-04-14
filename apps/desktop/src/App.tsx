import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "./components/ui/tooltip";
import { MainLayout } from "./components/layout/MainLayout";
import { CommandPalette } from "./components/command-bar/CommandPalette";
import { LayoutProvider } from "./contexts/LayoutContext";
import { WorkspaceProvider } from "./contexts/WorkspaceContext";
import "./index.css";
import "./shell.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <div className="dark h-full">
      <QueryClientProvider client={queryClient}>
        <WorkspaceProvider>
          <LayoutProvider>
            <TooltipProvider>
              <MainLayout />
              <CommandPalette />
            </TooltipProvider>
          </LayoutProvider>
        </WorkspaceProvider>
      </QueryClientProvider>
    </div>
  );
}
