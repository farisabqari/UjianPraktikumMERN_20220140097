import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import todoRoutes from "./routes/todos.js";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Terhubung ke MongoDB");
  })
  .catch((err) => {
    console.error("Kesalahan saat menghubungkan ke MongoDB:", err);
  });

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
