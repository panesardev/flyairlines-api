import { Request, Response, Router } from "express";
import { HttpResponse } from "../../interfaces/http.interface";
import { Airplane } from "./airplane.entity";
import { AirplaneService } from "./airplane.service";
import { isAuthenticated } from "../../auth/auth.middleware";
import { isAdmin } from "../../admin/admin.middleware";

export namespace AirplaneRouter {
  export const router = Router();
  
  router.get('/', async (request: Request, response: Response) => {
    const airplanesResponse: HttpResponse<Airplane[]> = await AirplaneService.findAll()
      .then(airplanes => ({ payload: airplanes, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(airplanesResponse);
  });

  router.get('/:model', async (request: Request, response: Response) => {
    const model: string = request.params.model;

    const airplaneResponse: HttpResponse<Airplane> = await AirplaneService.findByModel(model)
      .then(airplane => ({ payload: airplane, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(airplaneResponse);
  });
  
  router.post('/', isAuthenticated, isAdmin, async (request: Request, response: Response) => {
    const airplane: Airplane = request.body as Airplane;

    const airplaneResponse: HttpResponse<Airplane> = await AirplaneService.create(airplane)
      .then(airplane => ({ payload: airplane, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(airplaneResponse);
  });
  
  router.patch('/:id', isAuthenticated, isAdmin, async (request: Request, response: Response) => {
    const airplane: Airplane = request.body as Airplane;

    const airplaneResponse: HttpResponse<Airplane> = await AirplaneService.update(airplane)
      .then(airplane => ({ payload: airplane, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(airplaneResponse);
  });
  
  router.delete('/:id', isAuthenticated, isAdmin, async (request: Request, response: Response) => {
    const id: number = Number(request.params.id);

    const deleteResponse: HttpResponse<boolean> = await AirplaneService.remove(id)
      .then(() => ({ payload: true, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(deleteResponse);
  });
}
