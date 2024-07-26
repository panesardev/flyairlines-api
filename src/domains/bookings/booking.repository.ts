import { AppDataSource } from "../../database";
import { Booking } from "./booking.entity";

export const BookingRepository = AppDataSource.getRepository(Booking);