import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreatePersonInput, UpdatePersonInput } from "@vc-ide/shared";

import { api, queryKeys } from "../lib/api";

export function usePeople() {
  return useQuery({
    queryKey: queryKeys.people,
    queryFn: api.people.list,
  });
}

export function usePerson(id?: string) {
  return useQuery({
    queryKey: queryKeys.person(id ?? "unknown"),
    queryFn: () => api.people.get(id!),
    enabled: Boolean(id),
  });
}

export function useUpdatePerson(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdatePersonInput) => api.people.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.people });
      queryClient.invalidateQueries({ queryKey: queryKeys.person(id) });
    },
  });
}

export function useCreatePerson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePersonInput) => api.people.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.people }),
  });
}
