import _ from "lodash";

export const toObjectWithDateMoment = (obj: Record<string, any>) => {
  const result: Record<string, any> = {};
  _.forEach(obj, (value, key) => {
    result[key] = value;
  });
  return result;
};

export function getPageSizeParams(search: string) {
  const params = new URLSearchParams(search);
  const page = params.get("page") ? Math.floor(Number(params.get("page"))) : -1;
  const size = params.get("size") ? Math.floor(Number(params.get("size"))) : -1;

  return { params, page, size };
}

export const numberWithCommas = (x?: number) => {
  if (x === 0) return "0";
  if (!x) return "";
  const xStr = String(x).toString().split(".");
  return (
    xStr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    (!!xStr[1] ? `.${xStr[1]}` : "")
  );
};
