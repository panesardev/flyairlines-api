import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'iota_users' })
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;
  
  @Column()
  displayName: string;
  
  @Column()
  createdAt: Date;
}
