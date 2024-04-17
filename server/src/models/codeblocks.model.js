import mongoose from "mongoose";

const codeBlocksSchema = new mongoose.Schema(
  {   
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("CodeBlocks", codeBlocksSchema);