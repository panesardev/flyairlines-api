require('dotenv').config();

import { App } from "./src/app";

const PORT = Number(process.env.port) || 3000;

App.server.listen(PORT, () => console.log(`Server running at PORT:${PORT}`));
