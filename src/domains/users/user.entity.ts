import { Column, Entity, EntitySubscriberInterface, EventSubscriber, InsertEvent, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "../bookings/booking.entity";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
  
  @Column()
  displayName: string;
  
  @OneToMany(() => Booking, booking => booking.user)
  bookings: Booking[];
  
  @Column()
  verified: boolean;

  @Column()
  created: Date;
}

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }
  
  beforeInsert(event: InsertEvent<User>) {
    console.log(`BeforeInsert: `, event);
  }

}