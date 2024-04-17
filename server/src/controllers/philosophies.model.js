import Philosophies from "../models/philosophies.model.js";

export const createPhilosophies = async (req, res) => {
  try {
    const { description } = req.body;

    const newPhilosophies = new Philosophies({
      description,
    });
    const savedPhilosophies = await newPhilosophies.save();
    res.json(savedPhilosophies);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPhilosophies = async (req, res) => {
  try {
    const philosophies = await Philosophies.find();
    res.json(philosophies);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};


