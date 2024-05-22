import { createServer } from "./src/server";

const PORT = Number(process.env.port) || 3000;

const server = createServer();

server.listen(PORT, () => {
  console.log(`Express running at PORT:${PORT}`);
});

