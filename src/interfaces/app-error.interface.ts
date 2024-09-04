import { AppErrorCode } from "../constants/error-codes";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errorCode?: AppErrorCode,
  ) {
    super(message);
  }
}
