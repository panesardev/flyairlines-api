import 'reflect-metadata';
import { DataSource } from "typeorm";
import { Aircraft } from './domains/aircrafts/aircraft.entity';
import { Booking } from './domains/bookings/booking.entity';
import { Destination } from './domains/destinations/destination.entity';
import { Passenger } from './domains/passengers/passenger.entity';
import { User } from './domains/users/user.entity';
import { Flight } from './domains/flights/flight.entity';

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  synchronize: true,
  entityPrefix: 'flyairlines_',
  entities: [
    User, 
    Booking, 
    Aircraft, 
    Destination,
    Passenger,
    Flight,
  ],
});
