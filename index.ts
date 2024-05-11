import { getServer } from "./src/server";

const PORT = Number(process.env.port) || 3000;

const server = getServer();

server.listen(PORT, () => {
  console.log(`Express running at PORT:${PORT}`);
});

