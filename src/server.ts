import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { AuthRouter } from './auth/auth.router';
import { AppDataSource } from './database';
import { AirplaneRouter } from './domains/airplanes/airplane.router';
import { BookingRouter } from './domains/bookings/booking.router';
import { DestinationRouter } from './domains/destinations/destination.router';
import { FlightRouter } from './domains/flights/flight.router';
import { PassengerRouter } from './domains/passengers/passenger.router';
import { UserRouter } from './domains/users/user.router';
import { debug } from './middlewares/debug';

const server = express();

AppDataSource.initialize();

server.use(compression());
server.use(cors());
server.use(express.json());
server.use(debug);

server.get('/', (req, res) => {
  res.json({
    message: 'hello world',
  });
});

server.use('/auth', AuthRouter.router);
server.use('/airplanes', AirplaneRouter.router);
server.use('/bookings', BookingRouter.router);
server.use('/destinations', DestinationRouter.router);
server.use('/flights', FlightRouter.router);
server.use('/passengers', PassengerRouter.router);
server.use('/users', UserRouter.router);

export { server };