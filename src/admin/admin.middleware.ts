import { Request, Response } from "express";
import { ExtendedJwtPayload } from "../auth/auth.interface";
import { UserService } from "../domains/users/user.service";

export async function isAdmin(request: Request, response: Response, next: () => void) {
  const decoded: ExtendedJwtPayload = request.body.decoded;

  if (!decoded) {
    return response.status(403).json({ message: 'Forbidden' });
  }

  const user = await UserService.findById(decoded.userId);

  if (user.email !== process.env.ADMIN) {
    return response.status(403).json({ message: 'Forbidden' });
  }

  next();
}
