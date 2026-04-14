import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function SidebarSection({
  defaultOpen = true,
  title,
  children,
}: {
  defaultOpen?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="sidebar-section">
      <button
        className="sidebar-section-header"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span>{title}</span>
        <ChevronDown
          size={12}
          style={{
            transform: open ? "rotate(0deg)" : "rotate(-90deg)",
            transition: "transform 0.15s ease",
            flexShrink: 0,
          }}
        />
      </button>
      {open ? <div className="sidebar-list">{children}</div> : null}
    </section>
  );
}
