import { NextFunction, Request, Response } from "express";

export type AsyncRequestHandler = (request: Request, response: Response, next: NextFunction) => Promise<any>;

// should be removed after migrating to express 5.0
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
