import { Fetcher, NormalizedResponse, RequestData } from "./type/common";

export async function reactQueryCompatibleFetcher<T>(
  fetcher: Fetcher,
  requestData: RequestData
) {
  const res: NormalizedResponse<T> = await fetcher(requestData);
  if (res.isSuccess) {
    return res;
  }
  return Promise.reject(res);
}
