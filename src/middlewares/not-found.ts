import { Request, Response, NextFunction } from 'express';

export function notFound() {
  return (request: Request, response: Response, next: NextFunction) => {
    response.status(404);
    next(new Error('not found'));
  }
}
