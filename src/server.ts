import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { AppDataSource } from './config/db';
import { errorHandler } from './middlewares/error-handler';
import { logger } from './middlewares/logger';
import { router } from './router';

const server = express();

server.use(compression());
server.use(cors());
server.use(helmet());
server.use(express.json());

server.use(logger());

server.use('/api', router);

server.use(errorHandler());

AppDataSource.initialize();

export { server };

