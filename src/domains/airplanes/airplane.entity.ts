import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'airplanes' })
export class Airplane {
  @PrimaryGeneratedColumn()
  id?: number;
  
  @Column()
  model: string;

  @Column()
  capacity: number;
  
  @Column()
  occupied: number;

  @Column()
  price: number;
  
  @Column()
  isBooked: boolean;
}
