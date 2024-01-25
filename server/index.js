import express from "express";
import { PORT } from "./config.js";
import { FRONTEND_URL } from "../config.js";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/index.routes.js";
import tasksRoutes from "./routes/task.routes.js";

const app = express();

//const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(cookieParser());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());

//Rutas usadas
app.use("/api", indexRoutes);
app.use("/api", tasksRoutes);

//uso de archivo estaticos para el frontend
//app.use(express.static(join(__dirname, "../client/dist")));

app.use((req, res, next) => {
  res.status(404).json({ message: "endpoint not found" });
  next();
});

app.listen(PORT);
console.log(`Server on port ${PORT}`);
