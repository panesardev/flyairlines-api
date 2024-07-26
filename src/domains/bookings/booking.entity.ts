import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Passenger } from "../passengers/passenger.entity";

@Entity({ name: 'flyairlines_bookings' })
export class Booking {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, user => user.bookings)
  user: User;
  
  @OneToMany(() => Passenger, passenger => passenger.booking)
  passengers: Passenger[];

  @Column()
  fromDestinationId: number;
  
  @Column()
  toDestinationId: number;

  @Column()
  aircraftId: number;
  
  @Column()
  time: Date;

  @Column()
  created: Date;

  @Column()
  updated: Date;
}
