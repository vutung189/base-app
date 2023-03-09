import { format, parse } from "date-fns";
import _ from "lodash";
import moment from "moment";
import { FORMAT_DATE } from "./constants";

export const toMoment = (date?: Date) => {
  return !!date && _.isDate(date) ? moment(date.toISOString()) : undefined;
};

export function isDate(dateStr: string) {
  return !isNaN(new Date(dateStr).getDate());
}

export const convertStrDateToDate = (
  valuePar: string,
  inputFormat = FORMAT_DATE
) => {
  if (!valuePar) return undefined;
  if (typeof valuePar === "string") {
    return parse(valuePar, inputFormat, new Date());
  }

  return new Date(valuePar);
};

export const convertDateToStrDate = (
  date?: Date,
  inputFormat = FORMAT_DATE
) => {
  return !!date ? format(date, inputFormat) : undefined;
};

export const formatDateFromNumber = (dateNumber?: number, formatDate = FORMAT_DATE) => {
  if (!dateNumber) return "";
  return format(new Date(dateNumber), formatDate);
};
