import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateDealInput, UpdateDealInput } from "@vc-ide/shared";

import { api, queryKeys } from "../lib/api";

export function useDeals() {
  return useQuery({
    queryKey: queryKeys.deals,
    queryFn: api.deals.list,
  });
}

export function useDeal(id?: string) {
  return useQuery({
    queryKey: queryKeys.deal(id ?? "unknown"),
    queryFn: () => api.deals.get(id!),
    enabled: Boolean(id),
  });
}

export function useDealFull(id?: string) {
  return useQuery({
    queryKey: queryKeys.dealFull(id ?? "unknown"),
    queryFn: () => api.deals.full(id!),
    enabled: Boolean(id),
  });
}

export function useCreateDeal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateDealInput) => api.deals.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.deals });
      queryClient.invalidateQueries({ queryKey: queryKeys.pipelineDeals });
      queryClient.invalidateQueries({ queryKey: queryKeys.pipelineSummary });
    },
  });
}

export function useUpdateDeal(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateDealInput) => api.deals.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.deals });
      queryClient.invalidateQueries({ queryKey: queryKeys.deal(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.dealFull(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.pipelineDeals });
      queryClient.invalidateQueries({ queryKey: queryKeys.pipelineSummary });
    },
  });
}
