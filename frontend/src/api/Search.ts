import _ from "lodash";
import { APICore } from "./axios";

const api = new APICore();
export const SearchApi = {
  search(payload: Record<string, string>) {
    payload = { ...payload, pageNumber: payload.page, pageSize: payload.size };
    payload = _.omit(payload, ["page", "size"]);
    return api.get("/api/lg/find-all", payload);
  },
  getById(id: string) {
    return api.get(`/api/lg/find?id=${id}`);
  },
};
