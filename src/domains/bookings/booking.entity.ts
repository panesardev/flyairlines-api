import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Passenger } from "../passengers/passenger.entity";
import { Flight } from "../flights/flight.entity";

@Entity({ name: 'bookings' })
export class Booking {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, user => user.bookings)
  user: User;
  
  @OneToMany(() => Passenger, passenger => passenger.booking)
  passengers: Passenger[];

  @OneToOne(() => Flight, flight => flight.booking)
  flight: Flight;
  
  @Column()
  created: Date;

  @Column()
  updated: Date;
}
