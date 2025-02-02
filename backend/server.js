import express from "express"; // modern way of importing express
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Testing 123");
});

// local server
app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
