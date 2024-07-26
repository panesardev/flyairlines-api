import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'flyairlines_destinations' })
export class Destination {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  code: string;
  
  @Column()
  name: string;
}
