import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { QUERY_KEYS } from '@site/src/constants/queryKeys';
import {
  fetchMatured,
  fetchImMatured,
  fetchCandidates,
  fetchAllRegionsMatured,
} from '@site/src/Api/blocks/fetchBlocks';
import { useMessage } from './useMessage';
import { DEFAULT_REACT_QUERY_OPTIONS } from '../configs/reactQuery.config';
import {
  CANDIDATES_RESPONSE,
  IM_MATURED_RESPONSE,
  MATURED_RESPONSE,
} from '../Api/blocks/types';
import { useQueryConfigured } from './useQueryConfigured';
import { useEffect } from 'react';
import { useConfigUrlBasedRegion } from './useConfigUrlBasedRegion';

export const useFetchAllBlocks = (
  region: string,
  limit?: number,
  offset?: number
) => {
  const { setMessage, message } = useMessage();

  const { url } = useConfigUrlBasedRegion(region);

  const resultArray = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEYS.MATURED, region, limit, offset, url],
        queryFn: () => fetchMatured(region, limit, offset, url),
        ...DEFAULT_REACT_QUERY_OPTIONS,
      },
      {
        queryKey: [QUERY_KEYS.IM_MATURED, region, limit, offset, url],
        queryFn: () => fetchImMatured(region, limit, offset, url),
        ...DEFAULT_REACT_QUERY_OPTIONS,
      },
      {
        queryKey: [QUERY_KEYS.CANDIDATES, region, limit, offset, url],
        queryFn: () => fetchCandidates(region, limit, offset, url),
        ...DEFAULT_REACT_QUERY_OPTIONS,
      },
    ],
  });

  useEffect(() => {
    const isErrorMatured = resultArray[0]?.isError;
    const isErrorImMatured = resultArray[1]?.isError;
    const isErrorCandidates = resultArray[2]?.isError;
    if (
      !message?.text &&
      (isErrorMatured || isErrorImMatured || isErrorCandidates)
    ) {
      if (isErrorMatured)
        setMessage({ text: resultArray[0].error.message, type: 'error' });
      if (isErrorImMatured && !message?.text)
        setMessage({ text: resultArray[1].error.message, type: 'error' });
      if (isErrorCandidates && !message?.text)
        setMessage({ text: resultArray[2].error.message, type: 'error' });
    } else if (
      message.text &&
      !isErrorMatured &&
      !isErrorImMatured &&
      !isErrorCandidates
    )
      setMessage({ text: null, type: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultArray]);

  return resultArray as [
    UseQueryResult<MATURED_RESPONSE, Error>,
    UseQueryResult<IM_MATURED_RESPONSE, Error>,
    UseQueryResult<CANDIDATES_RESPONSE, Error>,
  ];
};

export const useFetchAllRegionsMaturedBlocks = ({
  urls,
  apiPath,
}: Parameters<typeof fetchAllRegionsMatured>[0]) => {
  return useQueryConfigured<MATURED_RESPONSE[]>(
    { urls, apiPath },
    QUERY_KEYS.ALL_REGIONS_MATURED,
    fetchAllRegionsMatured
  );
};
