import { Request, Response, Router } from "express";
import { CreateAccountRequestBody, LoginRequestBody } from "./auth.interface";
import { AuthService } from "./auth.service";
import { HttpResponse } from "../interfaces/http.interface";

export namespace AuthRouter {
  export const router = Router();

  router.post('/login', async (request: Request, response: Response) => {
    const body = request.body as LoginRequestBody;

    const tokenResponse: HttpResponse<string> = await AuthService.login(body)
      .then(token => ({ payload: token, errored: false }) as HttpResponse<string>)
      .catch(e => ({ errored: true, message: e.message }));

    response.json(tokenResponse);
  });

  router.post('/create-account', async (request: Request, response: Response) => {
    const body = request.body as CreateAccountRequestBody;

    const tokenResponse: HttpResponse<string> = await AuthService.createAccount(body)
      .then(token => ({ payload: token, errored: false }) as HttpResponse<string>)
      .catch(e => ({ errored: true, message: e.message }));

    response.json(tokenResponse);
  });
}
