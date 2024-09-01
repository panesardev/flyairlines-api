import 'reflect-metadata';
import { DataSource } from "typeorm";
import { Airplane } from './domains/airplanes/airplane.entity';
import { Booking } from './domains/bookings/booking.entity';
import { Destination } from './domains/destinations/destination.entity';
import { Flight } from './domains/flights/flight.entity';
import { Passenger } from './domains/passengers/passenger.entity';
import { User } from './domains/users/user.entity';

export const AppDataSource = new DataSource({
  synchronize: true,
  type: "postgres",
  url: process.env.POSTGRES_URL,
  entityPrefix: 'flyairlines_',
  entities: [
    User, 
    Booking, 
    Airplane, 
    Destination,
    Passenger,
    Flight,
  ],
});
