import { Request, Response, Router } from "express";

export class IndexController {
  private router = Router();

  getRouter() {
    this.router.get('/', this.index);
    return this.router;
  }

  private async index(request: Request, response: Response) {
    response.send('Express api starter project');
  }

}