import express, { Express } from 'express';
import cors from 'cors';
import compression from 'compression';
import { IndexRouter } from './routers/index.router';
import { ProductsRouter } from './routers/products.router';
import { logger } from './logger';

require('dotenv').config();

export function getServer(): Express {
  const server = express();
  
  server.use(compression());
  server.use(cors());
  server.use(express.json());

  server.use(logger);

  server.use('/', IndexRouter.router);
  server.use('/products', ProductsRouter.router);

  return server;
}
