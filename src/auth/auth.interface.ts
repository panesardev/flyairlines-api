import { JwtPayload } from 'jsonwebtoken';
import { User } from "../domains/users/user.entity";

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface CreateAccountRequestBody {
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