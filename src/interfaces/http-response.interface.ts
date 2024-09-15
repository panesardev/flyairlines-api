import { HttpCode } from "../constants/http-codes";

export interface HttpResponse<T> {
  message?: string;
  errored?: boolean;
  payload?: T;
  status?: HttpCode,
}