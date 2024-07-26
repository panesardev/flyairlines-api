import express from 'express';
import { AuthRouter } from './auth/auth.router';
import { AppDataSource } from './database';
import { debug } from 'console';
import compression from 'compression';
import cors from 'cors';
import { isAuthenticated } from './auth/auth.middleware';
import { UserRouter } from './domains/users/user.router';

export namespace App {
  export const server = express();
  
  server.use(compression());
  server.use(cors());
  server.use(express.json());

  server.use(debug);

  server.use('/auth', AuthRouter.router);
  server.use('/users', isAuthenticated, UserRouter.router);

  server.get('/', (request, response) => response.json({ message: 'hello_world' }));

  AppDataSource.initialize();
}
