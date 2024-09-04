import { Request, Response, Router } from "express";
import { CreateAccountRequestBody, AdminRequestBody, LoginRequestBody, Token } from "./auth.interface";
import { AuthService } from "./auth.service";
import { HttpResponse } from "../interfaces/http-response.interface";
import { ADMIN } from "../constants/env";

export namespace AuthRouter {
  export const router = Router();

  router.post('/login', async (request: Request, response: Response) => {
    const body = request.body as LoginRequestBody;

    const tokenResponse: HttpResponse<Token> = await AuthService.login(body)
      .then(body => ({ payload: body, errored: false }) as HttpResponse<Token>)
      .catch(e => ({ errored: true, message: e.message }));

    response.json(tokenResponse);
  });

  router.post('/create-account', async (request: Request, response: Response) => {
    const body = request.body as CreateAccountRequestBody;

    const tokenResponse: HttpResponse<Token> = await AuthService.createAccount(body)
      .then(body => ({ payload: body, errored: false }) as HttpResponse<Token>)
      .catch(e => ({ errored: true, message: e.message }));

    response.json(tokenResponse);
  });

  router.post('/is-admin', async (request: Request, response: Response) => {
    const body = request.body as AdminRequestBody;

    const adminResponse: HttpResponse<boolean> = {
      payload: body.email === ADMIN,
    }

    response.json(adminResponse);
  });
}
