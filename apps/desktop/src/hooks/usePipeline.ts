import { useQuery } from "@tanstack/react-query";

import { api, queryKeys } from "../lib/api";

export function usePipeline() {
  const deals = useQuery({
    queryKey: queryKeys.pipelineDeals,
    queryFn: api.pipeline.deals,
  });

  const summary = useQuery({
    queryKey: queryKeys.pipelineSummary,
    queryFn: api.pipeline.summary,
  });

  return {
    deals,
    summary,
    isLoading: deals.isLoading || summary.isLoading,
  };
}
