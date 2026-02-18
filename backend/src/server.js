import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// =====================
// Middleware
// =====================

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

// =====================
// Routes
// =====================

app.use("/api/notes", notesRoutes);

// =====================
// Production Setup (SPA Safe)
// =====================

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");

  // Serve static frontend files
  app.use(express.static(distPath));

  // SPA fallback (Express 5 compatible)
  app.use((req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// =====================
// Start Server
// =====================

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
