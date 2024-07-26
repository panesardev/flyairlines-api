import { Request, Response, Router } from "express";
import { AuthResponse, CreateAccountRequestBody, LoginRequestBody } from "./auth.interface";
import { AuthService } from "./auth.service";

export namespace AuthRouter {
  export const router = Router();

  router.post('/login', async (request: Request, response: Response) => {
    const body = request.body as LoginRequestBody;

    const authResponse: AuthResponse = await AuthService.login(body)
      .then(token => ({ token, errored: false }))
      .catch(e => ({ token: null, errored: true, message: e.message }));

    response.json(authResponse);
  });

  router.post('/create-account', async (request: Request, response: Response) => {
    const body = request.body as CreateAccountRequestBody;

    const authResponse: AuthResponse = await AuthService.createAccount(body)
      .then(token => ({ token, errored: false }))
      .catch(e => ({ token: null, errored: true, message: e.message }));

    response.json(authResponse);
  });
}
