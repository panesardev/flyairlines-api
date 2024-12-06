import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { ExtendedJwtPayload } from "../auth/auth.interface";
import { ADMIN, JWT_SECRET } from "../constants/env";
import { HttpCode } from "../constants/http-codes";
import { UserService } from "../domains/users/user.service";
import { HttpError } from "../interfaces/http.interface";

export function isAuthenticated() {
  return (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new HttpError(HttpCode.UNAUTHORIZED, 'unauthorized');
    }
    
    const token = authHeader.split(' ')[1];
  
    try {
      request.body.decoded = jwt.verify(token, JWT_SECRET);
      next();
    } 
    catch (e) {
      throw new HttpError(HttpCode.UNAUTHORIZED, e.message);
    }
  }
}

export function isOwner() {
  return (request: Request, response: Response, next: NextFunction) => {
    const decoded = request.body.decoded as ExtendedJwtPayload;
    
    if (!decoded) {
      throw new HttpError(HttpCode.UNAUTHORIZED, 'unauthorized');
    }
  
    if (decoded && decoded.userId === Number(request.params.id)) {
      return next();
    }

    throw new HttpError(HttpCode.FORBIDDEN, 'forbidden');
  } 
}

export function isAdmin() {
  return async (request: Request, response: Response, next: () => void) => {
    const decoded = request.body.decoded as ExtendedJwtPayload;
  
    if (!decoded) {
      throw new HttpError(HttpCode.UNAUTHORIZED, 'unauthorized');
    }
  
    const user = await UserService.findById(decoded.userId);
  
    if (user.email !== ADMIN) {
      throw new HttpError(HttpCode.FORBIDDEN, 'forbidden');
    }
  
    next();
  }
}