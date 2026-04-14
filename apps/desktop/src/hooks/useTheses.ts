import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateThesisInput, UpdateThesisInput } from "@vc-ide/shared";

import { api, queryKeys } from "../lib/api";

export function useTheses() {
  return useQuery({
    queryKey: queryKeys.theses,
    queryFn: api.theses.list,
  });
}

export function useThesis(id?: string) {
  return useQuery({
    queryKey: queryKeys.thesis(id ?? "unknown"),
    queryFn: () => api.theses.get(id!),
    enabled: Boolean(id),
  });
}

export function useCreateThesis() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateThesisInput) => api.theses.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.theses }),
  });
}

export function useUpdateThesis(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateThesisInput) => api.theses.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.theses });
      queryClient.invalidateQueries({ queryKey: queryKeys.thesis(id) });
    },
  });
}
