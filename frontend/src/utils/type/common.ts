export interface NormalizedResponse<T> {
  data?: T;
  statusCode: number;
  errorMessage?: string;
  isSuccess: boolean;
}

export type RequestData = any;
export type Fetcher = <T>(data: RequestData) => Promise<NormalizedResponse<T>>;