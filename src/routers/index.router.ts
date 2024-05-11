import { Request, Response, Router } from "express";

export namespace IndexRouter {
  export const router = Router();

  router.get('/', (request: Request, response: Response) => {
    response.send('Express api starter project');
  });
}
