import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Booking } from "../bookings/booking.entity";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;
  
  @Column()
  displayName: string;
  
  @OneToMany(() => Booking, booking => booking.user)
  bookings?: Booking[];
  
  @Column()
  verified?: boolean;

  @Column()
  created: Date;
}
