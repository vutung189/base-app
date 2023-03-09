import _ from "lodash";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { toObjectWithDateMoment } from "utils/utils";

export function useDefaultForm(value: Record<string, any>, hasPage = true) {
  const location = useLocation();
  const search = location.search;

  const { params, page } = getPageSizeParams(search);

  const objFilter = JSON.parse(params.get("filter") || "{}");
  return useMemo(() => {
    const filterParams = toObjectWithDateMoment(objFilter);
    const keyUrl = _.keys(objFilter);
    const result: Record<string, any> = {};
    _.forEach(keyUrl, (x) => {
      if (_.has(value, x)) {
        result[x] = filterParams[x];
      }
    });

    const rs = _.isEmpty(result) ? value : result;
    return hasPage ? { ...rs, page } : rs;
  }, [page]);
}
export function getPageSizeParams(search: string) {
  const params = new URLSearchParams(search);
  const page = params.get("page") ? Math.floor(Number(params.get("page"))) : 1;
  // const size = params.get("size") ? Math.floor(Number(params.get("size"))) : 100;

  return { params, page };
}
