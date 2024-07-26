import compression from 'compression';
import { debug } from 'console';
import cors from 'cors';
import express from 'express';
import { AppDataSource } from './database';
import { router } from './router';

export namespace App {
  export const server = express();
  
  server.use(compression());
  server.use(cors());
  server.use(express.json());

  server.use(debug);

  server.use('/', router);

  AppDataSource.initialize();
}
