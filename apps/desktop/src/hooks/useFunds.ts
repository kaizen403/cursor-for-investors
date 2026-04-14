import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateFundInput, UpdateFundInput } from "@vc-ide/shared";

import { api, queryKeys } from "../lib/api";

export function useFunds() {
  return useQuery({
    queryKey: queryKeys.funds,
    queryFn: api.funds.list,
  });
}

export function useFund(id?: string) {
  return useQuery({
    queryKey: queryKeys.fund(id ?? "unknown"),
    queryFn: () => api.funds.get(id!),
    enabled: Boolean(id),
  });
}

export function useCreateFund() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateFundInput) => api.funds.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.funds }),
  });
}

export function useUpdateFund(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateFundInput) => api.funds.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.funds });
      queryClient.invalidateQueries({ queryKey: queryKeys.fund(id) });
    },
  });
}
