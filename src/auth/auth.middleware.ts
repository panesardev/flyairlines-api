import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { ExtendedJwtPayload } from "../auth/auth.interface";
import { UserService } from "../domains/users/user.service";
import { ADMIN, JWT_SECRET } from "../constants/env";
import { HttpError } from "../interfaces/http-error.interface";
import { HttpCode } from "../constants/http-codes";
import { ErrorCode } from "../constants/error-codes";

export function isAuthenticated() {
  return (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new HttpError(HttpCode.UNAUTHORIZED, ErrorCode.UNAUTHORIZED);
      // return response.status(401).json({ message: 'unauthorized' });
    }
    
    const token = authHeader.split(' ')[1];
  
    try {
      request.body.decoded = jwt.verify(token, JWT_SECRET) as ExtendedJwtPayload;
      
      next();
    } 
    catch (e) {
      console.log('[ERROR] auth.middleware.ts: ', e.message);
      throw new HttpError(HttpCode.UNAUTHORIZED, ErrorCode.EXPIRED_JWT);
      // return response.status(401).json({ message: e.message });
    }
  }
}

export function isOwner() {
  return (request: Request, response: Response, next: NextFunction) => {
    const decoded = request.body.decoded as ExtendedJwtPayload;
    
    if (decoded && decoded.userId === Number(request.params.id)) {
      next();
    }
    else {
      throw new HttpError(HttpCode.FORBIDDEN, ErrorCode.ACCESS_DENIED);
      // return response.status(403).json({ message: 'forbidden' });
    }
  } 
}

export function isAdmin() {
  return async (request: Request, response: Response, next: () => void) => {
    const decoded = request.body.decoded as ExtendedJwtPayload;
  
    if (!decoded) {
      throw new HttpError(HttpCode.FORBIDDEN, ErrorCode.ACCESS_DENIED);
      // return response.status(403).json({ message: 'Forbidden' });
    }
  
    const user = await UserService.findById(decoded.userId);
  
    if (user.email !== ADMIN) {
      throw new HttpError(HttpCode.FORBIDDEN, ErrorCode.ACCESS_DENIED);
      // return response.status(403).json({ message: 'Forbidden' });
    }
  
    next();
  }
}