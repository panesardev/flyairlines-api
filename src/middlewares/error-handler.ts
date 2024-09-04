import { NextFunction, Request, Response } from "express";
import { AppError } from "../interfaces/app-error.interface";
import { ZodError } from 'zod';

export function errorHandler() {
  return (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (request.path === '/auth/refresh') {
      // clearAuthCookies(response);
    }
  
    if (error instanceof ZodError) {
      return handleZodError(response, error);
    }
  
    if (error instanceof AppError) {
      return handleAppError(response, error);
    }
  
    return response.status(500).send("internal server error");
  }
}

function handleZodError(response: Response, error: ZodError) {
  const errors = error.issues.map(e => ({
    path: e.path.join("."),
    message: e.message,
  }));

  return response.status(400).json({
    errors,
    message: error.message,
  });
}

function handleAppError(response: Response, error: AppError) {
  return response.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
}
