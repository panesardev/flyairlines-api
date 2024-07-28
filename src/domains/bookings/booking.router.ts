import { Request, Response, Router } from "express";
import { DeleteResult } from "typeorm";
import { HttpResponse } from "../../interfaces/http.interface";
import { Booking } from "./booking.entity";
import { BookingService } from "./booking.service";

export namespace BookingRouter {
  export const router = Router();
  
  router.get('/:id', async (request: Request, response: Response) => {
    const id = Number(request.params.id);

    const bookingResponse: HttpResponse<Booking> = await BookingService.findById(id)
      .then(booking => ({ payload: booking, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(bookingResponse);
  });
  
  router.get('/', async (request: Request, response: Response) => {
    const bookingsResponse: HttpResponse<Booking[]> = await BookingService.findAll()
      .then(bookings => ({ payload: bookings, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(bookingsResponse);
  });

  router.post('/', async (request: Request, response: Response) => {
    const booking: Booking = request.body.booking as Booking;

    const bookingResponse: HttpResponse<Booking> = await BookingService.create(booking)
      .then(booking => ({ payload: booking, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(bookingResponse);
  });
  
  router.patch('/', async (request: Request, response: Response) => {
    const booking: Booking = request.body.booking as Booking;

    const bookingResponse: HttpResponse<Booking> = await BookingService.update(booking)
      .then(booking => ({ payload: booking, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(bookingResponse);
  });
  
  router.delete('/:id', async (request: Request, response: Response) => {
    const id: number = Number(request.params.id);

    const deleteResponse: HttpResponse<DeleteResult> = await BookingService.remove(id)
      .then(result => ({ payload: result, errored: false }))
      .catch(e => ({ message: e.message, errored: true }));

    response.json(deleteResponse);
  });
}