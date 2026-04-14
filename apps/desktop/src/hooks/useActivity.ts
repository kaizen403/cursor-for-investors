import { useQuery } from "@tanstack/react-query";

import { api, queryKeys } from "../lib/api";

export function useActivity(limit = 50) {
  return useQuery({
    queryKey: queryKeys.activity(limit),
    queryFn: () => api.activity.recent(limit),
    refetchInterval: 30_000,
  });
}
