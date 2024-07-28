import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "../bookings/booking.entity";

@Entity({ name: 'flights' })
export class Flight {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  number: string;

  @OneToOne(() => Booking, booking => booking.flight)
  booking: Booking;
  
  @Column()
  fromDestinationCode: string;
  
  @Column()
  toDestinationCode: string;
  
  @Column()
  date: Date;
  
  @Column()
  aircraftId: number;
}
