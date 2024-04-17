import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Work", workSchema);