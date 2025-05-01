import { useQuery } from '@tanstack/react-query';
import { DEFAULT_REACT_QUERY_OPTIONS } from '@site/src/configs/reactQuery.config';

export const useQueryConfigured = <T>(
  fnProps: unknown,
  queryKey?: string,
  fetchFn?: (fnProps: unknown) => unknown,
  enabled: boolean = true
) => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: [queryKey, Object.values(fnProps)],
    queryFn: () => fetchFn(fnProps),
    ...DEFAULT_REACT_QUERY_OPTIONS,
    enabled,
  });

  return { data: data as T, isLoading };
};
