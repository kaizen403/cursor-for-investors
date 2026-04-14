import { MeetingForm } from "../components/workspace/MeetingForm";
import { useCreateMeeting, useMeeting, useUpdateMeeting } from "../hooks/useMeetings";
import { usePeople } from "../hooks/usePeople";

export function MeetingNotes({
  dealId,
  meetingId,
}: {
  dealId?: string;
  meetingId?: string;
}) {
  const meetingQuery = useMeeting(meetingId);
  const peopleQuery = usePeople();
  const createMeeting = useCreateMeeting();
  const updateMeeting = useUpdateMeeting(meetingId ?? "");

  if (meetingId && meetingQuery.isLoading) {
    return <div className="empty-state">Loading meeting note…</div>;
  }

  return (
    <div className="list-stack">
      <section className="data-card">
        <div className="muted">Meeting Notes</div>
        <strong>{meetingQuery.data ? "Edit note" : "New structured note"}</strong>
      </section>
      <section className="data-card">
        <MeetingForm
          defaultDealId={dealId}
          meeting={meetingQuery.data}
          onSave={async (payload) => {
            if (meetingId) {
              await updateMeeting.mutateAsync(payload);
              return;
            }

            await createMeeting.mutateAsync(payload);
          }}
          people={peopleQuery.data ?? []}
        />
      </section>
    </div>
  );
}
