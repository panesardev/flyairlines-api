import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'destinations' })
export class Destination {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  code: string;
  
  @Column({ unique: true })
  name: string;
}
