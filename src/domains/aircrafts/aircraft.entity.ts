import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'flyairlines_aircrafts' })
export class Aircraft {
  @PrimaryGeneratedColumn()
  id?: number;
  
  @Column()
  name: string;
  
  @Column()
  number: string;

  @Column()
  capacity: number;
  
  @Column()
  occupied: number;
  
  @Column()
  isBooked: boolean;
}
