import Work from "../models/works.model.js";

export const createWork = async (req, res) => {
    try {
      const {name, url, image,description } = req.body;
  
    const newWork = new Work({
      name,
      url,
      image,
      description,
    });
    const savedWork = await newWork.save();
    res.json(savedWork);
    } catch (error) {
      return res.status(500).json({message:"Something went wrong"});
    }
  };

  export const getWorks = async (req, res) => {
    try {
      const works = await Work.find();
      res.json(works);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  };