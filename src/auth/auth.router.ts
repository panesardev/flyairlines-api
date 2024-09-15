import { Router } from "express";
import { ADMIN } from "../constants/env";
import { HttpResponse } from "../interfaces/http-response.interface";
import { asyncRequestHandler } from "../utilities/async-request-handler";
import { Token } from "./auth.interface";
import { AuthService } from "./auth.service";
import { validateAdminRequest, validateCreateAccountRequest, validateLoginRequest } from "./auth.validation";

export namespace AuthRouter {
  export const router = Router();

  router.post('/login', asyncRequestHandler(
    async (request, response) => {
      const body = validateLoginRequest(request.body);

      const tokenResponse: HttpResponse<Token> = await AuthService.login(body)
        .then(body => ({ payload: body, errored: false }) as HttpResponse<Token>)
        .catch(e => ({ errored: true, message: e.message }));
  
      response.json(tokenResponse);
    },
  ));

  router.post('/create-account', asyncRequestHandler(
    async (request, response) => {
      const body = validateCreateAccountRequest(request.body);
  
      const tokenResponse: HttpResponse<Token> = await AuthService.createAccount(body)
        .then(body => ({ payload: body, errored: false }) as HttpResponse<Token>)
        .catch(e => ({ errored: true, message: e.message }));
  
      response.json(tokenResponse);
    },
  ));

  router.post('/is-admin', asyncRequestHandler(
    async (request, response) => {
      const body = validateAdminRequest(request.body);

      const adminResponse: HttpResponse<boolean> = {
        payload: body.email === ADMIN,
      }
  
      response.json(adminResponse);
    },
  ));
  
  router.post('/refresh', asyncRequestHandler(
    async (request, response) => {
      throw Error('Not implemented');
    },
  ));
}
