import { useEffect } from "react";

import { PersonCard } from "../components/workspace/PersonCard";
import { usePeople } from "../hooks/usePeople";
import { useWorkspace } from "../contexts/WorkspaceContext";

export function PersonView({ personId }: { personId?: string }) {
  const peopleQuery = usePeople();
  const person = peopleQuery.data?.find((entry) => entry.id === personId) ?? peopleQuery.data?.[0];
  const { addRecentItem } = useWorkspace();

  useEffect(() => {
    if (!person) {
      return;
    }

    addRecentItem({
      id: `person:${person.id}`,
      title: person.name,
      kind: "person",
    });
  }, [addRecentItem, person]);

  if (peopleQuery.isLoading) {
    return <div className="empty-state">Loading people…</div>;
  }

  if (!person) {
    return <div className="empty-state">No people records available.</div>;
  }

  return (
    <div className="list-stack">
      <PersonCard person={person} />
      <section className="data-card">
        <div className="muted">Connections</div>
        <p>
          {person.name} is currently tagged as {person.tags.join(", ") || "unclassified"} with a relationship score of{" "}
          {person.relationshipScore ?? "—"}.
        </p>
        <p className="muted">
          Use the command palette to jump between people and the associated company or deal context.
        </p>
      </section>
    </div>
  );
}
