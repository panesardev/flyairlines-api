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

export class App {
  private express = express();

  async getExpress() {
    this.express.use(compression());
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(debug);
    
    await AppDataSource.initialize();

    this.express.get('/', (req, res) => {
      res.json({
        message: 'hello world',
      });
    });

    this.express.use('/auth', AuthRouter.router);
    this.express.use('/airplanes', AirplaneRouter.router);
    this.express.use('/bookings', BookingRouter.router);
    this.express.use('/destinations', DestinationRouter.router);
    this.express.use('/flights', FlightRouter.router);
    this.express.use('/passengers', PassengerRouter.router);
    this.express.use('/users', UserRouter.router);

    return this.express;
  }

  async run(port: number) {
    const server = await this.getExpress();
    server.listen(port, () => console.log(`Server running at PORT:${port}`));
  }
}