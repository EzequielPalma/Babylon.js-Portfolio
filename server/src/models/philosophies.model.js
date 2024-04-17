import mongoose from "mongoose";

const philosophiesSchema = new mongoose.Schema(
  {   
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Philosophies", philosophiesSchema);