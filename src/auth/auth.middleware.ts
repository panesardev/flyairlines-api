import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { ExtendedJwtPayload } from "../auth/auth.interface";
import { UserService } from "../domains/users/user.service";
import { ADMIN, JWT_SECRET } from "../constants/env";

export function isAuthenticated() {
  return (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return response.status(401).json({ message: 'unauthorized' });
    }
    
    const token = authHeader.split(' ')[1];
  
    try {
      request.body.decoded = jwt.verify(token, JWT_SECRET) as ExtendedJwtPayload;

      next();
    } 
    catch (e) {
      console.log('[ERROR] auth.middleware.ts: ', e.message);
      response.status(401).json({ message: 'unauthorized' });
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
      response.status(403).json({ message: 'forbidden' });
    }
  } 
}

export function isAdmin() {
  return async (request: Request, response: Response, next: () => void) => {
    const decoded = request.body.decoded as ExtendedJwtPayload;
  
    if (!decoded) {
      return response.status(403).json({ message: 'Forbidden' });
    }
  
    const user = await UserService.findById(decoded.userId);
  
    if (user.email !== ADMIN) {
      return response.status(403).json({ message: 'Forbidden' });
    }
  
    next();
  }  
}