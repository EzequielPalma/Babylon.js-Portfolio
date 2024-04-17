import CodeBlocks from "../models/codeblocks.model.js";

export const createCodeBlocks = async (req, res) => {
  try {
    const { image } = req.body;

    const newCodeBlocks = new CodeBlocks({
      image,
    });
    const savedCodeBlocks = await newCodeBlocks.save();
    res.json(savedCodeBlocks);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getCodeBlocks = async (req, res) => {
  try {
    const codeBlocks = await CodeBlocks.find();
    res.json(codeBlocks);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};


