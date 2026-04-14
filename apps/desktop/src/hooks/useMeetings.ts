import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateMeetingInput, UpdateMeetingInput } from "@vc-ide/shared";

import { api, queryKeys } from "../lib/api";

export function useMeetings() {
  return useQuery({
    queryKey: queryKeys.meetings,
    queryFn: api.meetings.list,
  });
}

export function useMeeting(id?: string) {
  return useQuery({
    queryKey: queryKeys.meeting(id ?? "unknown"),
    queryFn: () => api.meetings.get(id!),
    enabled: Boolean(id),
  });
}

export function useCreateMeeting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateMeetingInput) => api.meetings.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.meetings });
      queryClient.invalidateQueries({ queryKey: queryKeys.activity(12) });
    },
  });
}

export function useUpdateMeeting(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateMeetingInput) => api.meetings.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.meetings });
      queryClient.invalidateQueries({ queryKey: queryKeys.meeting(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.activity(12) });
    },
  });
}
