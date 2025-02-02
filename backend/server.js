import express from "express"; // modern way of importing express
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import duhmpRoutes from "./routes/duhmp.route.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use("/api/duhmps", duhmpRoutes);

// local server
app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
