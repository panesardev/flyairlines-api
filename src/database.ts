import 'reflect-metadata';
import { DataSource } from "typeorm";
import { User } from './domains/users/user.entity';

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  synchronize: true,
  entities: [User, ],
})

export const UserRepository = AppDataSource.getRepository(User);
