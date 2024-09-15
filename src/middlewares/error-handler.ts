import { ErrorCode } from "@constants/error-codes";
import { HttpCode } from "@constants/http-codes";
import { HttpResponse } from "@interfaces/http-response.interface";
import { HttpError } from "../interfaces/http-error.interface";
import { ErrorRequestHandler, Response } from "express";
import { ZodError } from 'zod';

export function errorHandler(): ErrorRequestHandler {
  return (error, request, response, next) => {
    if (error instanceof ZodError) {
      return handleZodError(response, error);
    }
  
    if (error instanceof HttpError) {
      return handleHttpError(response, error);
    }

    const errorResponse: HttpResponse<null> = {
      status: HttpCode.INTERNAL_SERVER_ERROR,
      message: ErrorCode.INTERNAL_SERVER_ERROR,
      errored: true,
      payload: null,
    };

    return response.status(HttpCode.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

function handleZodError(response: Response, error: ZodError) {
  const errors = error.issues.map(e => ({
    path: e.path.join("."),
    message: e.message,
  }));

  const errorResponse: HttpResponse<typeof errors> = {
    status: HttpCode.BAD_REQUEST,
    message: ErrorCode.INVALID_DATA,
    errored: true,
    payload: errors,
  };

  return response.status(HttpCode.BAD_REQUEST).json(errorResponse);
}

function handleHttpError(response: Response, error: HttpError) {
  const errorResponse: HttpResponse<null> = {
    message: error.message,
    status: error.httpCode,
    errored: true,
    payload: null,
  };

  return response.status(error.httpCode).json(errorResponse);
}
