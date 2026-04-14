import type { LucideIcon } from "lucide-react";

type CommandItemProps = {
  icon?: LucideIcon;
  label: string;
  shortcut?: string;
  onSelect: () => void;
};

export function CommandItem({
  icon: Icon,
  label,
  shortcut,
  onSelect,
}: CommandItemProps) {
  return (
    <button className="command-item" onClick={onSelect} type="button">
      {Icon ? (
        <Icon size={14} style={{ flexShrink: 0, opacity: 0.65 }} />
      ) : null}
      <span style={{ flex: 1 }}>{label}</span>
      {shortcut ? (
        <span
          style={{
            fontSize: 10,
            background: "oklch(1 0 0 / 0.08)",
            padding: "1px 5px",
            borderRadius: 3,
            border: "1px solid var(--border)",
            color: "var(--muted-foreground)",
            flexShrink: 0,
            fontFamily: "inherit",
          }}
        >
          {shortcut}
        </span>
      ) : null}
    </button>
  );
}
