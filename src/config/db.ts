import 'reflect-metadata';
import { DataSource } from "typeorm";
import { Airplane } from '../domains/airplanes/airplane.entity';
import { Booking } from '../domains/bookings/booking.entity';
import { Destination } from '../domains/destinations/destination.entity';
import { Flight } from '../domains/flights/flight.entity';
import { Passenger } from '../domains/passengers/passenger.entity';
import { User, UserSubscriber } from '../domains/users/user.entity';
import { POSTGRES_URL } from '../constants/env';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: POSTGRES_URL,
  entityPrefix: 'flyairlines_',
  entities: [
    User, 
    Booking, 
    Airplane, 
    Destination,
    Passenger,
    Flight,
  ],
  subscribers: [
    UserSubscriber,
  ],
});

export const UserRepository = AppDataSource.getRepository(User);
export const BookingRepository = AppDataSource.getRepository(Booking);
export const AirplaneRepository = AppDataSource.getRepository(Airplane);
export const DestinationRepository = AppDataSource.getRepository(Destination);
export const PassengerRepository = AppDataSource.getRepository(Passenger);
export const FlightRepository = AppDataSource.getRepository(Flight);
