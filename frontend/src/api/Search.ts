import { APICore } from "./axios";

const api = new APICore();
export const SearchApi = {
  search(payload: Record<string, string | number>) {
    payload = { ...payload, size: 100 };
    return api.get("/api/lg/find-all", payload);
  },
  getById(id: string) {
    return api.get(`/api/lg/find?id=${id}`);
  },
};
