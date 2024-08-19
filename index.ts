require('dotenv').config();

import { App } from "./src/app";

const PORT = Number(process.env.port) || 3000;

new App().run(PORT);