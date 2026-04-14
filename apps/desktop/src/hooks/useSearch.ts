import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { api, queryKeys } from "../lib/api";

export function useSearch(query: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(query.trim());

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [query]);

  return useQuery({
    queryKey: queryKeys.search(debouncedQuery),
    queryFn: () => api.search.query(debouncedQuery),
    enabled: debouncedQuery.length > 1,
  });
}
