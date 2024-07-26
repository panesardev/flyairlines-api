import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Booking } from "../bookings/booking.entity";

@Entity({ name: 'flyairlines_passengers' })
export class Passenger {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Booking, booking => booking.passengers)
  booking: Booking
  
  @Column()
  firstName: string;
  
  @Column()
  lastName: string;

  @Column()
  email: string;
  
  @Column()
  passportNumber: string;
}
