import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Server as SocketServer } from "socket.io";

import { getState, applyEvent, resetState, toStatus } from "./src/state.js";
import { upsertPosition, listPositions } from "./src/positions.js";

const PORT = Number(process.env.PORT ?? 4000);
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/mandir";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new SocketServer(server, { cors: { origin: "*" } });

function broadcast(status) {
  io.emit("status", status);
}

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/status", async (_req, res) => {
  const state = await getState();
  res.json(toStatus(state));
});

// crossing events from the python side: { type: "enter"|"exit", camera }
app.post("/api/events", async (req, res) => {
  const { type, camera } = req.body;
  if (type !== "enter" && type !== "exit") {
    return res.status(400).json({ error: "type must be 'enter' or 'exit'" });
  }
  const status = await applyEvent(type, camera);
  broadcast(status);
  res.json(status);
});

app.post("/api/reset", async (_req, res) => {
  const status = await resetState();
  broadcast(status);
  res.json(status);
});

// ESP32 devices post their position here every ~2s
app.post("/api/position", (req, res) => {
  const { mac_address, coordinates, is_active } = req.body ?? {};
  if (
    typeof mac_address !== "string" ||
    !coordinates ||
    typeof coordinates.x !== "number" ||
    typeof coordinates.y !== "number"
  ) {
    return res
      .status(400)
      .json({ error: "expected { mac_address, coordinates:{x,y}, is_active }" });
  }

  upsertPosition({ mac_address, coordinates, is_active: is_active ?? true });
  io.emit("positions", listPositions());
  res.json({ ok: true });
});

app.get("/api/positions", (_req, res) => {
  res.json(listPositions());
});

io.on("connection", async (socket) => {
  const state = await getState();
  socket.emit("status", toStatus(state));
});

async function start() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB:", MONGO_URI);
  server.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start backend:", err);
  process.exit(1);
});
