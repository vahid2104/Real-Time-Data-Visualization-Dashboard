import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";

import { createApp, connectDb } from "./app.js";
import { registerSocketHandlers } from "./socket/index.js";

dotenv.config();

const PORT = Number(process.env.PORT || 4000);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:3000";

const app = createApp();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
    credentials: true,
  },
});

registerSocketHandlers(io);

await connectDb();

server.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
