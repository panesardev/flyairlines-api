require('dotenv').config();

import { App } from "../src/app";

export default new App().getExpress();
