import { JwtPayload } from 'jsonwebtoken';
import { User } from "../domains/users/user.entity";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateAccountRequest {
  user: User;
}

export interface AuthResponse {
  token: string | null;
  errored: boolean;  
  message?: string;
}

export interface ExtendedJwtPayload extends JwtPayload {
  userId: User['id'];
}