import { NextFunction, Request, Response } from "express";

export function logger(request: Request, response: Response, next: NextFunction) {
  const date = new Date();
  const dateString = `${date.toDateString()}`;
  const timeString = `${date.toTimeString().slice(0, 8)}`;
  
  const message = {
    date: dateString,
    time: timeString,
    method: request.method,
    path: request.url,
  };

  console.log(message);
  next();
}
