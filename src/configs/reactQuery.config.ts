import { QueryOptions } from "@tanstack/react-query";

export const DEFAULT_REACT_QUERY_OPTIONS = {
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 1000,

} as QueryOptions