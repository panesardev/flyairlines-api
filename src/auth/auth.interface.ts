import { JwtPayload } from 'jsonwebtoken';
import { z } from 'zod';
import { User } from "../domains/users/user.entity";
import { adminSchema, createAccountSchema, loginSchema } from './auth.validation';

export type LoginRequestBody = Required<z.infer<typeof loginSchema>>;

export type CreateAccountRequestBody = Required<z.infer<typeof createAccountSchema>>;

export type AdminRequestBody = Required<z.infer<typeof adminSchema>>;

export type Token = string; 

export interface ExtendedJwtPayload extends JwtPayload {
  userId: User['id'];
}
