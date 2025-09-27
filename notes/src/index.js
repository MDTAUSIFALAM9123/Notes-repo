import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./db.js";
import notesRouter from "./routes/notes.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

connectDB();

// Routes
app.use("/notes", notesRouter);

// Test route
app.get("/", (req, res) => res.send("Notes Service is running 🚀"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`📝 Notes service running on http://localhost:${PORT}`));
