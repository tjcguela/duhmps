import mongoose from "mongoose";
import Duhmp from "../models/duhmp.model.js";

export const getDuhmps = async (req, res) => {
  try {
    const duhmps = await Duhmp.find({});
    res.status(200).json({ success: true, data: duhmps });
  } catch (error) {
    console.log("Error in fetching duhmps.", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const createDuhmp = async (req, res) => {
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
};

export const updateDuhmp = async (req, res) => {
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
};

export const deleteDuhmp = async (req, res) => {
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
};
