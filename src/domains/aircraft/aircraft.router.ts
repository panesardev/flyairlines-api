import { Request, Response, Router } from "express";
import { HttpResponse } from "../../interfaces/http.interface";
import { Aircraft } from "./aircraft.entity";
import { AircraftService } from "./aircraft.service";

export namespace AircraftRouter {
  export const router = Router();
  
  router.get('/', async (request: Request, response: Response) => {
    const aircraftsResponse: HttpResponse<Aircraft[]> = await AircraftService.findAll()
      .then(aircrafts => ({ payload: aircrafts, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(aircraftsResponse);
  });

  router.get('/:model', async (request: Request, response: Response) => {
    const model: string = request.params.model;

    const aircraftResponse: HttpResponse<Aircraft> = await AircraftService.findByModel(model)
      .then(aircraft => ({ payload: aircraft, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(aircraftResponse);
  });
  
  router.post('/', async (request: Request, response: Response) => {
    const aircraft: Aircraft = request.body.aircraft as Aircraft;

    const aircraftResponse: HttpResponse<Aircraft> = await AircraftService.create(aircraft)
      .then(aircraft => ({ payload: aircraft, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(aircraftResponse);
  });
  
  router.patch('/', async (request: Request, response: Response) => {
    const aircraft: Aircraft = request.body.aircraft as Aircraft;

    const aircraftResponse: HttpResponse<Aircraft> = await AircraftService.update(aircraft)
      .then(aircraft => ({ payload: aircraft, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(aircraftResponse);
  });
  
  router.delete('/:id', async (request: Request, response: Response) => {
    const id: number = Number(request.params.id);

    const deleteResponse: HttpResponse<boolean> = await AircraftService.remove(id)
      .then(() => ({ payload: true, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(deleteResponse);
  });
}