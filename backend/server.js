import express from "express";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));
app.use(express.static(path.join(__dirname, "build/dist")));

app.use(express.json());

app.use("/api/auth", auth);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
