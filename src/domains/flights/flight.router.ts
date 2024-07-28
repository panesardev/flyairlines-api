import { Request, Response, Router } from "express";
import { HttpResponse } from "../../interfaces/http.interface";
import { Flight } from "./flight.entity";
import { FlightService } from "./flight.service";

export namespace FlightRouter {
  export const router = Router();

  router.get('/', async (request: Request, response: Response) => {
    const flightsResponse: HttpResponse<Flight[]> = await FlightService.findAll()
      .then(flights => ({ payload: flights, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(flightsResponse);
  });

  router.get('/:number', async (request: Request, response: Response) => {
    const number: string = request.params.number;

    const flightResponse: HttpResponse<Flight> = await FlightService.findByNumber(number)
      .then(flight => ({ payload: flight, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(flightResponse);
  });
  
  router.post('/', async (request: Request, response: Response) => {
    const flight: Flight = request.body.flight as Flight;

    const flightResponse: HttpResponse<Flight> = await FlightService.create(flight)
      .then(flight => ({ payload: flight, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(flightResponse);
  });
  
  router.patch('/', async (request: Request, response: Response) => {
    const flight: Flight = request.body.flight as Flight;

    const flightResponse: HttpResponse<Flight> = await FlightService.update(flight)
      .then(flight => ({ payload: flight, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(flightResponse);
  });
  
  router.delete('/:id', async (request: Request, response: Response) => {
    const id: number = Number(request.params.id);

    const deleteResponse: HttpResponse<boolean> = await FlightService.remove(id)
      .then(() => ({ payload: true, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(deleteResponse);
  });
}
