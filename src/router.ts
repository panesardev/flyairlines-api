import { Router } from "express";
import { Request, Response } from "express";
import { AuthRouter } from "./auth/auth.router";
import { UserRouter } from "./domains/users/user.router";
import { PassengerRouter } from "./domains/passengers/passenger.router";
import { AirplaneRouter } from "./domains/airplanes/airplane.router";
import { FlightRouter } from "./domains/flights/flight.router";
import { BookingRouter } from "./domains/bookings/booking.router";
import { DestinationRouter } from "./domains/destinations/destination.router";

const router = Router();

router.use('/auth', AuthRouter.router);
router.use('/users', UserRouter.router);
router.use('/passengers', PassengerRouter.router);
router.use('/airplanes', AirplaneRouter.router);
router.use('/flights', FlightRouter.router);
router.use('/bookings', BookingRouter.router);
router.use('/destinations', DestinationRouter.router);

router.use('/', (request: Request, response: Response) => {
  response.json({ message: 'hello world' });
});

router.use('*', (request: Request, response: Response) => {
  response.status(404).json({ message: 'not found' });
});

export { router };
