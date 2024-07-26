import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserService } from '../domains/users/user.service';
import { CreateAccountRequest, ExtendedJwtPayload, LoginRequest } from "./auth.interface";

export namespace AuthService {
  export async function login(body: LoginRequest): Promise<string> {
    const exists = await UserService.findByEmail(body.email);
    if (exists) {
      const doesPasswordMatch = await compare(body.password, exists.password);
  
      if (doesPasswordMatch) {
        const payload: ExtendedJwtPayload = { userId: exists.id };
        const token = sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
        return token;
      }
      else throw Error('password is incorrect');
    }
    else throw Error('user not found');
  }

  export async function createAccount(body: CreateAccountRequest): Promise<string> {
    const exists = await UserService.findByEmail(body.user.email);
    if (exists) throw Error('user already exists');

    const password = body.user.password;
    const hashedPassword = await hash(password, 10);
    body.user.password = hashedPassword;
  
    await UserService.create(body.user);

    return await login({ email: body.user.email, password });
  }
}
