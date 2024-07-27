import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserService } from '../domains/users/user.service';
import { CreateAccountRequestBody, ExtendedJwtPayload, LoginRequestBody } from "./auth.interface";

export namespace AuthService {
  export async function login(body: LoginRequestBody): Promise<string> {
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

  export async function createAccount(body: CreateAccountRequestBody): Promise<string> {
    const exists = await UserService.findByEmail(body.email);
    if (exists) throw Error('user already exists');

    const password = body.password;
    const hashedPassword = await hash(password, 10);
    body.password = hashedPassword;
  
    await UserService.create({
      created: new Date(),
      displayName: body.displayName,
      email: body.email,
      password: body.password,
    });

    return await login({ email: body.email, password });
  }
}
