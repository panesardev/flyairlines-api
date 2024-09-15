import { ErrorCode } from "@constants/error-codes";
import { HttpCode } from "@constants/http-codes";

export class HttpError extends Error {
  constructor(public httpCode: HttpCode, public message: ErrorCode) {
    super(message);
  }
}
