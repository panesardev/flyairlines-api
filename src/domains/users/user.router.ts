import { Request, Response, Router } from "express";
import { isOwner } from "../../auth/auth.middleware";
import { HttpResponse } from "../../interfaces/http.interface";
import { User } from "./user.entity";
import { UserService } from "./user.service";

export namespace UserRouter {
  export const router = Router();

  router.get('/:id', isOwner, async (request: Request, response: Response) => {
    const id: User['id'] = Number(request.params.id);

    const userResponse: HttpResponse<User> = await UserService.findById(id)
      .then(user => {
        const { password, ...payload } = user;
        return { payload, errored: false };
      })
      .catch(e => ({ message: e.message, errored: true }));

    response.json(userResponse);
  });
}
