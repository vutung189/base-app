import { useEffect } from "react";
import { useQuery, UseQueryOptions } from "react-query";
import { reactQueryCompatibleFetcher } from "../query";
import { Fetcher, NormalizedResponse, RequestData } from "../type/common";
type QueryKeyT = any;

interface QueryOptions {
  enabled?: boolean;
  longCached?: boolean;
  payloadNotAsKey?: boolean;
  keepPreviousData?: boolean;
}

export function useFetch<T>(
  fetcher: Fetcher,
  requestData: RequestData,
  queryKey: string,
  queryOptions?: QueryOptions
) {
  const options: UseQueryOptions<
    NormalizedResponse<T>,
    Error,
    NormalizedResponse<T>,
    QueryKeyT
  > = {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: true,
    retry: false,
    keepPreviousData: queryOptions?.keepPreviousData === false ? false : true,
    enabled: queryOptions?.enabled === false ? false : true,
    staleTime: queryOptions?.longCached ? 3600 * 1000 : 0,
  };

  const key = queryOptions?.payloadNotAsKey
    ? queryKey
    : [queryKey!, requestData];
  const context = useQuery<
    NormalizedResponse<T>,
    Error,
    NormalizedResponse<T>,
    QueryKeyT
  >(key, () => reactQueryCompatibleFetcher<T>(fetcher, requestData), options);

  useEffect(() => {
    return () => {
      if (options.staleTime === 0) {
        context.remove();
      }
    };
  }, []);

  return {
    data: context.data,
    error: context.error,
    status: context.status,
    refetch: context.refetch,
    remove: context.remove,
    isFetching: context.isFetching,
    isLoading: context.isLoading,
    isFetched: context.isFetched,
  };
}

export async function fallbackFetcher(
  data: RequestData
): Promise<NormalizedResponse<any>> {
  return {
    isSuccess: true,
    statusCode: 0,
  };
}
