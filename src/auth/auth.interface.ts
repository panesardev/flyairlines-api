import { JwtPayload } from 'jsonwebtoken';
import { User } from "../domains/users/user.entity";

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface CreateAccountRequestBody {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type Token = string; 

export interface AdminRequestBody {
  email: string;
}

export interface ExtendedJwtPayload extends JwtPayload {
  userId: User['id'];
}