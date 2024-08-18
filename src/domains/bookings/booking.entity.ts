import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Flight } from "../flights/flight.entity";
import { User } from "../users/user.entity";

@Entity({ name: 'bookings' })
export class Booking {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, user => user.bookings)
  user: User;
  
  @OneToOne(() => Flight, flight => flight.booking)
  flight: Flight;
  
  @Column()
  created: Date;

  @Column()
  updated: Date;
}
