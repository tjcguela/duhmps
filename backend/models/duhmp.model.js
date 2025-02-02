import mongoose from "mongoose";

const duhmpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //created at, updated at
  }
);

const Duhmp = mongoose.model("Duhmp", duhmpSchema);

export default Duhmp;
