import { Request, Response, Router } from "express";
import { HttpResponse } from "../../interfaces/http.interface";
import { Passenger } from "./passenger.entity";
import { PassengerService } from "./passenger.service";

export namespace PassengerRouter {
  export const router = Router();

  router.get('/', async (request: Request, response: Response) => {
    const passengersResponse: HttpResponse<Passenger[]> = await PassengerService.findAll()
      .then(passengers => ({ payload: passengers, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(passengersResponse);
  });

  router.get('/:id', async (request: Request, response: Response) => {
    const id = Number(request.params.id);

    const passengerResponse: HttpResponse<Passenger> = await PassengerService.findById(id)
      .then(passenger => ({ payload: passenger, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(passengerResponse);
  });
  
  router.post('/', async (request: Request, response: Response) => {
    const passenger: Passenger = request.body.passenger as Passenger;

    const passengerResponse: HttpResponse<Passenger> = await PassengerService.create(passenger)
      .then(passenger => ({ payload: passenger, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(passengerResponse);
  });
  
  router.patch('/', async (request: Request, response: Response) => {
    const passenger: Passenger = request.body.passenger as Passenger;

    const passengerResponse: HttpResponse<Passenger> = await PassengerService.update(passenger)
      .then(passenger => ({ payload: passenger, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(passengerResponse);
  });
  
  router.delete('/:id', async (request: Request, response: Response) => {
    const id: number = Number(request.params.id);

    const deleteResponse: HttpResponse<boolean> = await PassengerService.remove(id)
      .then(() => ({ payload: true, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(deleteResponse);
  });
}
