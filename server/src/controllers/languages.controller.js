import Language from "../models/languages.model.js";

export const createLanguage = async (req, res) => {
    try {
      const {name,image, description } = req.body;
  
    const newLanguage = new Language({
      name,
      image,
      description,
    });
    const savedLanguage = await newLanguage.save();
    res.json(savedLanguage);
    } catch (error) {
      return res.status(500).json({message:"Something went wrong"});
    }
  };

  export const getLanguages = async (req, res) => {
    try {
      const languages = await Language.find();
      res.json(languages);
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  };