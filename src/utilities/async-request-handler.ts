import { NextFunction, Request, Response } from "express";

export type AsyncRequestHandler = (request: Request, response: Response, next: NextFunction) => Promise<any>;

export function asyncRequestHandler(handler: AsyncRequestHandler): AsyncRequestHandler {
  return async (request, response, next) => {
    try {
      await handler(request, response, next);
    }
    catch (error) {
      next(error);
    }
  }
}
