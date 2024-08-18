import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Flight } from "../flights/flight.entity";

@Entity({ name: 'passengers' })
export class Passenger {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Flight, flight => flight.passengers)
  flight: Flight;
  
  @Column()
  displayName: string;

  @Column()
  email: string;
}
