import express from "express"; // modern way of importing express
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Duhmp from "./models/duhmp.model.js";

const app = express();
dotenv.config();

app.use(express.json());
app.get("/api/duhmps", async (req, res) => {
  try {
    const duhmps = await Duhmp.find({});
    res.status(200).json({ success: true, data: duhmps });
  } catch (error) {
    console.log("Error in fetching duhmps.", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
});
app.post("/api/duhmps", async (req, res) => {
  const duhmp = req.body;

  if (!duhmp.name || !duhmp.price || !duhmp.image) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all the required fields.",
    });
  }

  const newDuhmp = new Duhmp(duhmp);

  try {
    await newDuhmp.save();
    res.status(201).json({ success: true, data: newDuhmp });
  } catch (error) {
    console.error("Error in creating duhmp: ", error.message);
    res.status(500).json({
      success: false,
      message: "Server error: failed to create duhmp.",
    });
  }
});
app.put("/api/duhmps/:id", async (req, res) => {
  const { id } = req.params;

  const duhmp = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Duhmp ID." });
  }

  try {
    const updatedDuhmp = await Duhmp.findByIdAndUpdate(id, duhmp, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedDuhmp });
  } catch (error) {
    console.error("Error in updating duhmp: ", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
app.delete("/api/duhmps/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid duhmp ID." });
  }

  try {
    await Duhmp.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Duhmp Deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// local server
app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
