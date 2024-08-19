import { Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import { ExtendedJwtPayload } from "../auth/auth.interface";
import { UserService } from "../domains/users/user.service";

export function isAuthenticated(request: Request, response: Response, next: () => void) {
  const authHeader = request.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return response.status(401).json({ message: 'Unauthorized' });
  }
  
  const token = authHeader.split(' ')[1];

  try {
    const decoded = verify(token, process.env.JWT_SECRET) as ExtendedJwtPayload;
    request.body.decoded = decoded;
    next();
  } 
  catch (e) {
    console.log('[ERROR] auth.middleware.ts: ', e.message);
    response.status(403).json({ message: 'Forbidden' });
  }
}

export function isOwner(request: Request, response: Response, next: () => void) {
  const decoded = request.body.decoded as ExtendedJwtPayload;
  
  if (decoded.userId === Number(request.params.id)) {
    next();
  }
  else {
    response.status(403).json({ message: 'Forbidden' });
  }
}

export async function isAdmin(request: Request, response: Response, next: () => void) {
  const decoded = request.body.decoded as ExtendedJwtPayload;

  if (!decoded) {
    return response.status(403).json({ message: 'Forbidden' });
  }

  const user = await UserService.findById(decoded.userId);

  if (user.email !== process.env.ADMIN) {
    return response.status(403).json({ message: 'Forbidden' });
  }

  next();
}
