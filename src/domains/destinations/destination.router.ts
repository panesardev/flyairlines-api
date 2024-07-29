import { Request, Response, Router } from "express";
import { HttpResponse } from "../../interfaces/http.interface";
import { Destination } from "./destination.entity";
import { DestinationService } from "./destination.service";
import { isAuthenticated } from "../../auth/auth.middleware";
import { isAdmin } from "../../admin/admin.middleware";

export namespace DestinationRouter {
  export const router = Router();

  router.get('/', async (request: Request, response: Response) => {
    const destinationsResponse: HttpResponse<Destination[]> = await DestinationService.findAll()
      .then(destinations => ({ payload: destinations, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(destinationsResponse);
  });

  router.get('/:code', async (request: Request, response: Response) => {
    const code: string = request.params.code;

    const destinationResponse: HttpResponse<Destination> = await DestinationService.findByCode(code)
      .then(destination => ({ payload: destination, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(destinationResponse);
  });
  
  router.post('/', isAuthenticated, isAdmin, async (request: Request, response: Response) => {
    const destination: Destination = request.body.destination as Destination;

    const destinationResponse: HttpResponse<Destination> = await DestinationService.create(destination)
      .then(destination => ({ payload: destination, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(destinationResponse);
  });
  
  router.patch('/', isAuthenticated, isAdmin, async (request: Request, response: Response) => {
    const destination: Destination = request.body.destination as Destination;

    const destinationResponse: HttpResponse<Destination> = await DestinationService.update(destination)
      .then(destination => ({ payload: destination, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(destinationResponse);
  });
  
  router.delete('/:id', isAuthenticated, isAdmin, async (request: Request, response: Response) => {
    const id: number = Number(request.params.id);

    const deleteResponse: HttpResponse<boolean> = await DestinationService.remove(id)
      .then(() => ({ payload: true, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(deleteResponse);
  });
}
