import 'reflect-metadata';
import { DataSource } from "typeorm";
import { Aircraft } from './domains/aircrafts/aircraft.entity';
import { Booking } from './domains/bookings/booking.entity';
import { Destination } from './domains/destinations/destination.entity';
import { User } from './domains/users/user.entity';

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  synchronize: true,
  entities: [
    User, 
    Booking, 
    Aircraft, 
    Destination,
  ],
});
