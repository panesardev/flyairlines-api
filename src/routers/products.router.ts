import { Request, Response, Router } from "express";

export namespace ProductsRouter {
  export const router = Router();

  router.get('', (request: Request, response: Response) => {});
  router.get('/:id', (request: Request, response: Response) => {});
  router.post('', (request: Request, response: Response) => {});
  router.patch('', (request: Request, response: Response) => {});
  router.delete('', (request: Request, response: Response) => {});
}
