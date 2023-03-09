/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash";
import { useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getPageSizeParams } from "./useDefaultForm";
import { useFetch } from "./useFetch";

export function usePaginatedFilterUrl(
  queryKey: string,
  fetcher: any,
  converterPayload: any,
  defaultFormValues: Record<string, any>,
  formValues = defaultFormValues,
  hasPage = true
) {
  const history = useHistory();
  const location = useLocation();

  const path = location.pathname;
  const search = location.search;

  const { params, page: pageTmp = 1 } = getPageSizeParams(search);

  const page = pageTmp < 1 ? 1 : pageTmp;
  // const size = sizeTmp < 1 || sizeTmp > 100 ? 100 : sizeTmp;

  const pageValue = page - 1;

  useEffect(() => {
    if (hasPage) {
      params.set("page", page.toString());
      // params.set("size", size.toString());
    }
    history.push(`${path}?${params.toString()}`);
  }, [page]);

  useEffect(() => {
    if (formValues) {
      params.set(
        "filter",
        JSON.stringify(_.omit(formValues, ["page", "size"]))
      );
      history.push(`${path}?${params.toString()}`);
    }
  }, [formValues]);

  const requestData = useMemo(() => {
    if (page > 0) {
      const rs = converterPayload(formValues);
      return hasPage ? { ...rs, page: pageValue } : rs;
    }
  }, [page, formValues]);

  const result: any = useFetch(fetcher, requestData, queryKey, {
    enabled: !!requestData,
    payloadNotAsKey: true,
  });

  useEffect(() => {
    if (requestData) {
      result.refetch();
    }
  }, [requestData]);

  useEffect(() => {
    const totalElements = result?.data?.data?.totalElements;
    const size = result?.data?.data?.size || 100;

    if (totalElements) {
      const pageTmp = _.round(totalElements / size);
      const pageMax = pageTmp < 1 ? 1 : pageTmp;

      if (pageMax < page) {
        if (hasPage) {
          params.set("page", pageMax.toString());
        }
        const url = `${path}?${params.toString()}`;
        history.push(url);
        history.go(0);
      }
    }
  }, [result?.data?.data?.totalElements]);

  return {
    ...result,
    data: result.data?.data,
    defaultPageCurrent: page,
    totalRecord: result.data?.data?.totalElements,
    defaultPage: { page, size: 100 },
    isLoading: result.isFetching,
    requestData,
  };
}
