import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateMemoInput, UpdateMemoInput } from "@vc-ide/shared";

import { api, queryKeys } from "../lib/api";

export function useMemos() {
  return useQuery({
    queryKey: queryKeys.memos,
    queryFn: api.memos.list,
  });
}

export function useMemoById(id?: string) {
  return useQuery({
    queryKey: queryKeys.memo(id ?? "unknown"),
    queryFn: () => api.memos.get(id!),
    enabled: Boolean(id),
  });
}

export function useCreateMemo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateMemoInput) => api.memos.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.memos }),
  });
}

export function useUpdateMemo(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateMemoInput) => api.memos.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.memos });
      queryClient.invalidateQueries({ queryKey: queryKeys.memo(id) });
    },
  });
}
