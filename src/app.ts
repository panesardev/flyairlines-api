import compression from 'compression';
import { debug } from './middlewares/debug';
import cors from 'cors';
import express from 'express';
import { isAuthenticated } from './auth/auth.middleware';
import { AuthRouter } from './auth/auth.router';
import { AppDataSource } from './database';
import { UserRouter } from './domains/users/user.router';
import { DestinationRouter } from './domains/destinations/destination.router';

export namespace App {
  export const server = express();
  
  server.use(compression());
  server.use(cors());
  server.use(express.json());

  server.use(debug);

  server.use('/auth', AuthRouter.router);
  server.use('/users', isAuthenticated, UserRouter.router);
  server.use('/destinations', DestinationRouter.router);

  AppDataSource.initialize();
}

export default App.server;