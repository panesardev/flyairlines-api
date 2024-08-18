import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "../bookings/booking.entity";
import { Passenger } from "../passengers/passenger.entity";

@Entity({ name: 'flights' })
export class Flight {
  @PrimaryGeneratedColumn()
  id?: number;
  
  @OneToMany(() => Passenger, passenger => passenger.flight)
  passengers: Passenger[];

  @OneToOne(() => Booking, booking => booking.flight)
  booking: Booking;
  
  @Column()
  airplaneModel: string;
  
  @Column()
  isRoundTrip: boolean;

  @Column({ unique: true })
  number: string;

  @Column()
  fromDestinationCode: string;
  
  @Column()
  toDestinationCode: string;
  
  @Column()
  date: string;
}
